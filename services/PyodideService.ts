
// globalThis.loadPyodide is available after the script in index.html loads
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string, packages?: string[] }) => Promise<any>;
    pyodide: any; // Pyodide instance
  }
}

let pyodideInstance: any = null;
let pyodideLoadingPromise: Promise<void> | null = null;

export async function initializePyodide(): Promise<void> {
  if (pyodideInstance) return Promise.resolve();
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    console.log("PyodideService: Loading Pyodide...");
    if (typeof window.loadPyodide !== 'function') {
      console.error("PyodideService: loadPyodide function not found on window object.");
      throw new Error("Pyodide script not loaded or loadPyodide not available on window.");
    }
    
    const loadedPyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
    });
    
    window.pyodide = loadedPyodide; 
    pyodideInstance = loadedPyodide; 
    
    console.log("PyodideService: Pyodide instance obtained. Attempting to ensure Python environment is fully active.");
    try {
      // Attempt a simple Python execution to ensure the interpreter is fully ready and built-ins are accessible.
      // This also pre-loads/initializes 'sys' if it wasn't already.
      await pyodideInstance.runPythonAsync(`
import sys
_pyodide_service_sys_check_variable = True # Simple assignment to confirm execution
# print("PyodideService: 'sys' module primed by preliminary Python execution.") # Optional: for debugging
      `);
      console.log("PyodideService: Preliminary Python execution successful. 'sys' module should be primed.");
    } catch (e) {
      console.error("PyodideService: Error during preliminary Python execution (sys priming):", e);
      pyodideInstance = null; // Mark as not ready if this fails
      throw new Error("Pyodide failed during preliminary sys priming: " + (e instanceof Error ? e.message : String(e)));
    }
    
    console.log("PyodideService: Pyodide loaded successfully. Proceeding with critical 'sys' module check.");

    const sysModule = pyodideInstance.globals.get('sys');
    if (!sysModule) {
        console.error("PyodideService: 'sys' module not found in Pyodide globals even after priming.");
        pyodideInstance = null;
        throw new Error("Pyodide initialization incomplete: 'sys' module not found after priming.");
    }
    
    const stdout = sysModule.stdout;
    const stderr = sysModule.stderr;

    if (!stdout || !stderr) {
        console.error("PyodideService: Pyodide loaded, but 'sys.stdout' or 'sys.stderr' not found on the Pyodide sys module, even after priming.", { stdoutAvailable: !!stdout, stderrAvailable: !!stderr });
        pyodideInstance = null; // Mark as not ready
        throw new Error("Pyodide initialization incomplete: 'sys.stdout' or 'sys.stderr' missing after priming.");
    }
    console.log("PyodideService: 'sys' module and streams confirmed available after priming.");

  })();
  
  try {
    await pyodideLoadingPromise;
  } catch(error) {
    console.error("PyodideService: Initialization promise failed.", error);
    pyodideInstance = null; // Ensure it's null on any initialization error
    throw error; // Re-throw the error so App.tsx can catch it and update pyodideReady state
  } finally {
    pyodideLoadingPromise = null; 
  }
}

export function isPyodideReady(): boolean {
  return !!pyodideInstance;
}

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  error?: string; 
}

export async function runPythonCode(code: string): Promise<PythonExecutionResult> {
  if (!isPyodideReady() || !pyodideInstance) {
    console.error("PyodideService: Pyodide not initialized correctly.");
    return { stdout: "", stderr: "Pyodide not ready or failed to initialize.", error: "Pyodide not ready." };
  }

  let stdoutAccumulator = "";
  let stderrAccumulator = "";
  
  const sysModule = pyodideInstance.globals.get('sys');
  
  if (!sysModule || !sysModule.stdout || !sysModule.stderr) {
      console.error("PyodideService: sys module or its streams are unexpectedly missing post-initialization. This should not happen if initialization succeeded.");
      return { stdout: "", stderr: "Pyodide internal error: sys module streams missing.", error: "Pyodide sys streams missing." };
  }

  const originalStdout = sysModule.stdout;
  const originalStderr = sysModule.stderr;

  sysModule.stdout = {
    write: (msg: string) => { stdoutAccumulator += msg; return msg.length; },
    isatty: false, // Pyodide stdout/stderr are not ttys
  };
  sysModule.stderr = {
    write: (msg: string) => { stderrAccumulator += msg; return msg.length; },
    isatty: false, // Pyodide stdout/stderr are not ttys
  };

  try {
    await pyodideInstance.runPythonAsync(code);
    return { stdout: stdoutAccumulator.trimEnd(), stderr: stderrAccumulator.trimEnd() };
  } catch (e: any) {
    console.error("PyodideService: Python execution error:", e);
    const jsErrorMessage = e.message || String(e);
    
    let finalStderr = stderrAccumulator.trimEnd();
    const pythonErrorPrefix = "PythonError: "; 
    // Check if the JavaScript error message is essentially the Python traceback that might already be in stderr
    const jsErrorIsPythonTraceback = jsErrorMessage.startsWith(pythonErrorPrefix) || 
                                     (finalStderr && finalStderr.includes(jsErrorMessage.split('\n')[0]));

    if (!jsErrorIsPythonTraceback && jsErrorMessage) {
        // If the JS error is not just a wrapper for the Python error already in stderr, append it.
        finalStderr += (finalStderr ? "\n" : "") + "JavaScript Execution Error: " + jsErrorMessage;
    } else if (!finalStderr && jsErrorMessage) {
        // If stderr is empty but there's a JS error message, use it.
        finalStderr = "Execution Error: " + jsErrorMessage;
    }
    
    return { stdout: stdoutAccumulator.trimEnd(), stderr: finalStderr, error: jsErrorMessage };
  } finally {
    // Restore original streams, ensuring sysModule was available
    if (sysModule) { 
        sysModule.stdout = originalStdout;
        sysModule.stderr = originalStderr;
    }
  }
}
