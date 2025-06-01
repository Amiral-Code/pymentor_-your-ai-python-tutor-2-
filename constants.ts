
import { LessonModule } from './types';

export const PYTHON_LESSONS: LessonModule[] = [
  // MODULE 1: Python Foundations (Phase 1)
  {
    id: 'module-1',
    title: 'Python Foundations',
    description: 'Grasp the fundamental building blocks of Python programming.',
    isPremium: false,
    topics: [
      {
        id: 'topic-1-1',
        title: 'What is Python & Your First Program',
        contentParagraphs: [
          "**What is Programming?** Programming is the process of creating a set of instructions that tell a computer how to perform a task. These instructions are written in a programming language.",
          "**What is Python?** Python is a high-level, interpreted programming language known for its simple syntax, readability, and versatility. Created by Guido van Rossum and first released in 1991, it's widely used in web development, data science, artificial intelligence, automation, and more.",
          "**Why Python?**\n- **Readability:** Python's syntax is designed to be clear and easy to read, almost like plain English.\n- **Versatility:** It can be used for a wide range of applications.\n- **Large Community & Libraries:** Python has a vast collection of libraries (pre-written code) and a supportive global community.",
          "**Setting up your environment:**\n1.  **Install Python:** Download the latest version from [python.org](https://python.org) and follow the installation instructions for your operating system. Make sure to check the box that says \"Add Python to PATH\" during installation on Windows.\n2.  **IDE/Text Editor:** An Integrated Development Environment (IDE) or a good text editor makes coding easier. Popular choices include VS Code (free, recommended), PyCharm Community Edition (free), Sublime Text, or even Python's built-in IDLE (good for starting).",
          "**Your First Program: \"Hello, World!\"**\nOpen your chosen editor, create a new file (e.g., `hello.py`), type the following code, save it, and run it (usually via a 'Run' button in your IDE or by typing `python hello.py` in your terminal/command prompt in the directory where you saved the file):",
          "**Comments:** Comments are notes in your code that are ignored by the Python interpreter. They are used to explain code.\n- Single-line comments start with `#`.\n- Multi-line comments or docstrings (documentation strings) are enclosed in triple quotes (`\"\"\"...\"\"\"` or `'''...'''`). Docstrings are often used at the beginning of modules, classes, or functions to describe what they do."
        ],
        codeExamples: [
          { 
            id: 'ce-1-1-1', 
            title: 'Hello, World!', 
            code: "print(\"Hello, World!\")", 
            explanation: "The `print()` function displays the text (or other data) inside the parentheses on the screen." 
          },
          {
            id: 'ce-1-1-2',
            title: 'Using Comments',
            code: "# This is a single-line comment\nprint(\"Hello again!\") # This comment is at the end of a line\n\n\"\"\"\nThis is a multi-line comment\n(often used as a docstring).\nIt can span multiple lines.\n\"\"\"\n'''\nThis also works for multi-line comments.\n'''\n\nmy_variable = 10 # Assign a value to a variable",
            explanation: "Comments help make your code understandable. The interpreter ignores them."
          }
        ],
        quiz: [
          { id: 'q-1-1-1', questionText: "What is Python primarily known for?", options: ["Its speed being faster than C++", "Its readability and versatility", "Being difficult for beginners", "Only being useful for web servers"], correctOptionIndex: 1, explanation: "Python is celebrated for its easy-to-read syntax and its wide applicability across various domains." },
          { id: 'q-1-1-2', questionText: "How do you write a single-line comment in Python?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"], correctOptionIndex: 2, explanation: "Single-line comments in Python start with the `#` symbol." },
          { id: 'q-1-1-3', questionText: "What is the typical file extension for a Python script?", options: [".pyt", ".pt", ".py", ".python"], correctOptionIndex: 2, explanation: "Python scripts are usually saved with a `.py` extension." }
        ]
      },
      {
        id: 'topic-1-2',
        title: 'Variables and Data Types',
        contentParagraphs: [
          "**Variables:** Variables are like containers that store data values. You assign a value to a variable using the assignment operator (`=`).",
          "**Naming Conventions:**\n- Variable names can contain letters, numbers, and underscores.\n- They cannot start with a number.\n- They are case-sensitive (`myVar` is different from `myvar`).\n- Use descriptive names (e.g., `user_age` instead of `x`). The common convention in Python is to use `snake_case` (all lowercase with underscores).",
          "**Basic Data Types:** Python has several built-in data types:",
          "- **Integers (`int`):** Whole numbers, positive or negative, without decimals (e.g., `10`, `-3`, `0`).",
          "- **Floating-point numbers (`float`):** Numbers with a decimal point or in exponential form (e.g., `3.14`, `-0.001`, `2.5e2` which is 250.0).",
          "- **Strings (`str`):** Sequences of characters, used for text. Enclosed in single quotes (`'...'`), double quotes (`\"...\"`), or triple quotes for multi-line strings (`'''...'''` or `\"\"\"...\"\"\"`).",
          "  - **Concatenation:** Combining strings using `+`.",
          "  - **Indexing:** Accessing individual characters (e.g., `my_string[0]` for the first character).",
          "  - **Slicing:** Getting a substring (e.g., `my_string[1:4]`).",
          "  - **Common methods:** `len()`, `.upper()`, `.lower()`, `.find()`, `.replace()`.",
          "  - **f-strings (Formatted String Literals):** A convenient way to embed expressions inside string literals (e.g., `f\"My name is {name}\"`).",
          "- **Booleans (`bool`):** Represent truth values. Can only be `True` or `False` (note the capitalization).",
          "**Type Conversion (Casting):** You can convert values from one type to another using functions like `int()`, `float()`, `str()`, `bool()`."
        ],
        codeExamples: [
          { 
            id: 'ce-1-2-1', 
            title: 'Assigning Variables & Basic Types', 
            code: "name = \"Alice\"  # String\nage = 30       # Integer\nheight = 5.5   # Float\nis_student = True # Boolean\n\nprint(name)\nprint(age)\nprint(height)\nprint(is_student)", 
            explanation: "Variables store different types of data. Python is dynamically typed, meaning you don't have to declare the type." 
          },
          {
            id: 'ce-1-2-2',
            title: 'String Operations & f-strings',
            code: "first_name = \"John\"\nlast_name = \"Doe\"\nfull_name = first_name + \" \" + last_name\nprint(full_name) # Output: John Doe\n\nmessage = f\"My name is {full_name} and I am {age} years old.\"\nprint(message) # Assuming 'age' variable from previous example\n\nword = \"Python\"\nprint(len(word))      # Output: 6\nprint(word.upper())   # Output: PYTHON\nprint(word[0])        # Output: P (first character)\nprint(word[2:5])      # Output: tho (slice from index 2 up to, but not including, 5)",
            explanation: "Strings can be combined, formatted, and manipulated using various methods."
          },
          {
            id: 'ce-1-2-3',
            title: 'Type Conversion',
            code: "num_string = \"123\"\nnum_integer = int(num_string)\nprint(num_integer + 7) # Output: 130\n\nfloat_val = 99.9\nint_val = int(float_val)\nprint(int_val) # Output: 99 (decimal part is truncated)\n\nnum = 42\nstr_num = str(num)\nprint(\"The number is \" + str_num)",
            explanation: "`int()`, `float()`, `str()` can convert values between compatible types."
          }
        ],
        quiz: [
          { id: 'q-1-2-1', questionText: "Which of the following is a valid variable name in Python?", options: ["2_variable", "my-variable", "my_variable", "$variable"], correctOptionIndex: 2, explanation: "Variable names can contain letters, numbers, and underscores, but cannot start with a number or contain hyphens or other special symbols like '$'." },
          { id: 'q-1-2-2', questionText: "What is the data type of the value `3.14`?", options: ["int", "str", "float", "bool"], correctOptionIndex: 2, explanation: "Numbers with a decimal point are `float` data types." },
          { id: 'q-1-2-3', questionText: "What will `str(100)` do?", options: ["Convert the string \"100\" to an integer", "Return an error", "Convert the integer 100 to a string \"100\"", "Check if 100 is a string"], correctOptionIndex: 2, explanation: "The `str()` function converts its argument into a string representation." }
        ]
      },
      {
        id: 'topic-1-3',
        title: 'Basic Operators',
        contentParagraphs: [
          "Operators are special symbols that perform operations on values (operands).",
          "**Arithmetic Operators:**\n- `+` : Addition (e.g., `5 + 2` is `7`)\n- `-` : Subtraction (e.g., `5 - 2` is `3`)\n- `*` : Multiplication (e.g., `5 * 2` is `10`)\n- `/` : True Division (results in a float, e.g., `5 / 2` is `2.5`)\n- `//` : Floor Division (divides and rounds down to the nearest whole number, e.g., `5 // 2` is `2`)\n- `%` : Modulo (remainder of division, e.g., `5 % 2` is `1`)\n- `**` : Exponentiation (e.g., `5 ** 2` is `25`, meaning 5 to the power of 2)",
          "**Comparison Operators:** Used to compare values; they return a Boolean (`True` or `False`).\n- `==` : Equal to (e.g., `5 == 5` is `True`)\n- `!=` : Not equal to (e.g., `5 != 2` is `True`)\n- `>` : Greater than (e.g., `5 > 2` is `True`)\n- `<` : Less than (e.g., `5 < 2` is `False`)\n- `>=` : Greater than or equal to (e.g., `5 >= 5` is `True`)\n- `<=` : Less than or equal to (e.g., `5 <= 2` is `False`)",
          "**Logical Operators:** Used to combine conditional statements.\n- `and` : Returns `True` if both operands are true (e.g., `(5 > 2) and (3 < 4)` is `True`).\n- `or` : Returns `True` if at least one operand is true (e.g., `(5 < 2) or (3 < 4)` is `True`).\n- `not` : Inverts the truth value (e.g., `not (5 < 2)` is `True`).",
          "**Assignment Operators:** Used to assign values to variables.\n- `=` : Basic assignment (e.g., `x = 5`)\n- `+=` : Add and assign (e.g., `x += 2` is equivalent to `x = x + 2`)\n- `-=` : Subtract and assign\n- `*=` : Multiply and assign\n- `/=` : Divide and assign"
        ],
        codeExamples: [
          { 
            id: 'ce-1-3-1', 
            title: 'Arithmetic Operators', 
            code: "a = 10\nb = 3\nprint(f\"a + b = {a + b}\")\nprint(f\"a / b = {a / b}\")\nprint(f\"a // b = {a // b}\")\nprint(f\"a % b = {a % b}\")\nprint(f\"a ** b = {a ** b}\")", 
            explanation: "Demonstrates common arithmetic operations. Pay attention to the difference between `/` and `//`." 
          },
          {
            id: 'ce-1-3-2',
            title: 'Comparison and Logical Operators',
            code: "x = 7\ny = 4\n\nprint(f\"Is x equal to y? {x == y}\")  # False\nprint(f\"Is x greater than y? {x > y}\") # True\n\ncondition1 = x > 0  # True\ncondition2 = y < 5  # True\nprint(f\"Both conditions true? {condition1 and condition2}\") # True\nprint(f\"Is condition1 false? {not condition1}\")        # False",
            explanation: "Comparison operators return Boolean values. Logical operators combine these Boolean results."
          }
        ],
        quiz: [
          { id: 'q-1-3-1', questionText: "What is the result of `7 // 2` in Python?", options: ["3.5", "3", "4", "1"], correctOptionIndex: 1, explanation: "Floor division `//` divides and rounds down to the nearest whole number." },
          { id: 'q-1-3-2', questionText: "Which logical operator returns `True` only if both its operands are true?", options: ["or", "not", "and", "xor"], correctOptionIndex: 2, explanation: "The `and` operator requires both conditions to be true for the overall expression to be true." },
          { id: 'q-1-3-3', questionText: "If `x = 5`, what is the value of `x` after `x += 3`?", options: ["5", "3", "8", "2"], correctOptionIndex: 2, explanation: "`x += 3` is shorthand for `x = x + 3`, so `x` becomes `5 + 3 = 8`." }
        ]
      },
      {
        id: 'topic-1-4',
        title: 'Input and Output',
        contentParagraphs: [
          "**Output with `print()`:** The `print()` function is used to display information to the user. You can print strings, numbers, variables, and expressions.",
          "- You can print multiple items by separating them with commas. `print()` will add a space between them by default.",
          "- You can control the separator and end character using the `sep` and `end` arguments.",
          "**Input with `input()`:** The `input()` function allows you to get information from the user via the keyboard.",
          "- It displays a prompt (optional) to the user and waits for them to type something and press Enter.",
          "- The `input()` function **always returns the user's input as a string**, even if they type numbers. You'll often need to convert it to the appropriate type (e.g., `int()` or `float()`) if you want to perform calculations."
        ],
        codeExamples: [
          { 
            id: 'ce-1-4-1', 
            title: 'Using print()', 
            code: "name = \"Bob\"\nage = 25\nprint(\"Hello, my name is\", name, \"and I am\", age, \"years old.\")\n\n# Using f-string (often preferred for readability)\nprint(f\"Hello, my name is {name} and I am {age} years old.\")\n\nprint(\"Item1\", \"Item2\", \"Item3\", sep=\" | \") # Custom separator\nprint(\"First line\", end=\" - \") # Custom end character\nprint(\"Second line\")", 
            explanation: "`print()` is versatile for displaying output. f-strings are very useful for embedding variables."
          },
          {
            id: 'ce-1-4-2',
            title: 'Using input() and Type Conversion',
            code: "user_name = input(\"What is your name? \")\nprint(f\"Hello, {user_name}!\")\n\nuser_age_str = input(\"How old are you? \")\n# Input is always a string, convert to integer for calculations\nuser_age_int = int(user_age_str)\nyears_until_100 = 100 - user_age_int\nprint(f\"You will be 100 in {years_until_100} years.\")",
            explanation: "`input()` gets user data as a string. Remember to convert it if you need another type like `int`."
          }
        ],
        quiz: [
          { id: 'q-1-4-1', questionText: "What does the `input()` function always return?", options: ["An integer", "A float", "A string", "A boolean"], correctOptionIndex: 2, explanation: "Regardless of what the user types, `input()` returns the value as a string." },
          { id: 'q-1-4-2', questionText: "How can you print multiple items with a custom separator, like a comma and a space, using `print()`?", options: ["`print(item1, item2, item3, separator=', ')`", "`print(item1, item2, item3, sep=', ')`", "`print(item1 + \", \" + item2 + \", \" + item3)`", "`print(item1; item2; item3, sep=', ')`"], correctOptionIndex: 1, explanation: "The `sep` argument in the `print()` function allows you to specify a custom separator string." },
          { id: 'q-1-4-3', questionText: "If a user enters '25' when prompted by `age = input('Enter age: ')`, what is the data type of the `age` variable immediately after this line?", options: ["int", "float", "str", "bool"], correctOptionIndex: 2, explanation: "`input()` returns a string, so `age` will be the string '25'." }
        ]
      }
    ]
  },
  // MODULE 2: Control Flow (Phase 2)
  {
    id: 'module-2',
    title: 'Control Flow',
    description: 'Direct the execution path of your programs using conditional logic and loops.',
    isPremium: false,
    topics: [
      {
        id: 'topic-2-1',
        title: 'Conditional Statements (if, elif, else)',
        contentParagraphs: [
          "Conditional statements allow your program to make decisions and execute different blocks of code based on whether specific conditions are true or false.",
          "**`if` Statement:** Executes a block of code only if its condition is `True`.",
          "**`if-else` Statement:** Executes one block of code if the condition is `True` and another block if it's `False`.",
          "**`if-elif-else` Statement:** Allows you to check multiple conditions in sequence.\n- `elif` is short for \"else if\".\n- Python checks the `if` condition first. If it's false, it checks the first `elif`. If that's false, it checks the next `elif`, and so on.\n- The `else` block (optional) executes if none of the preceding `if` or `elif` conditions were true.",
          "**Indentation is crucial!** Python uses indentation (usually 4 spaces) to define which lines of code belong to the `if`, `elif`, or `else` block. Incorrect indentation will lead to errors or unexpected behavior.",
          "**Nested Conditionals:** You can place `if` statements inside other `if` statements to create more complex decision-making logic."
        ],
        codeExamples: [
          { 
            id: 'ce-2-1-1', 
            title: 'Basic if-elif-else', 
            code: "temperature = 25\n\nif temperature > 30:\n    print(\"It's a hot day!\")\nelif temperature > 20:  # This condition is checked if the first 'if' was false\n    print(\"It's a pleasant day.\")\nelse:\n    print(\"It might be cold.\")",
            explanation: "The code checks temperature ranges. Since 25 > 20, \"It's a pleasant day.\" is printed."
          },
          {
            id: 'ce-2-1-2',
            title: 'Using `if` with `and`',
            code: "age = 20\nhas_license = True\n\nif age >= 18 and has_license:\n    print(\"You are allowed to drive.\")\nelse:\n    print(\"You are not allowed to drive.\")",
            explanation: "Both conditions (`age >= 18` and `has_license`) must be true for the first message to print."
          },
          {
            id: 'ce-2-1-3',
            title: 'Nested if statement',
            code: "num = 10\nif num > 0:\n    print(\"Number is positive.\")\n    if num % 2 == 0:\n        print(\"And it is an even number.\")\n    else:\n        print(\"And it is an odd number.\")\nelif num == 0:\n    print(\"Number is zero.\")\nelse:\n    print(\"Number is negative.\")",
            explanation: "The inner if/else block only executes if the outer `if num > 0` condition is true."
          }
        ],
        quiz: [
          { id: 'q-2-1-1', questionText: "What keyword is used in Python for an 'else if' condition?", options: ["else if", "elseif", "elsif", "elif"], correctOptionIndex: 3, explanation: "Python uses `elif` as the keyword for 'else if' conditions." },
          { id: 'q-2-1-2', questionText: "In an `if-elif-else` structure, when is the `else` block executed?", options: ["Always", "Only if the `if` condition is true", "Only if all `if` and `elif` conditions are false", "Only if at least one `elif` condition is true"], correctOptionIndex: 2, explanation: "The `else` block executes if none of the preceding `if` or `elif` conditions are met." },
          { id: 'q-2-1-3', questionText: "What defines a block of code under an `if` statement in Python?", options: ["Curly braces {}", "Parentheses ()", "Indentation", "The `block` keyword"], correctOptionIndex: 2, explanation: "Python uses indentation (whitespace at the beginning of the line) to define code blocks." }
        ]
      },
      {
        id: 'topic-2-2',
        title: 'Loops (for, while)',
        contentParagraphs: [
          "Loops are used to execute a block of code repeatedly.",
          "**`for` Loop:** Iterates over a sequence (like a string, list, tuple) or other iterable objects. It's often used when you know how many times you want to loop or want to process each item in a collection.",
          "- **`range()` function:** Often used with `for` loops to generate a sequence of numbers (e.g., `range(5)` produces 0, 1, 2, 3, 4).",
          "**`while` Loop:** Executes a block of code as long as a specified condition remains `True`. It's used when the number of iterations isn't known beforehand and depends on a condition becoming false.",
          "- **Caution:** Be careful with `while` loops to avoid infinite loops. Ensure the condition will eventually become false.",
          "**Loop Control Statements:**",
          "- **`break`:** Immediately terminates the current loop (both `for` and `while`) and resumes execution at the next statement after the loop.",
          "- **`continue`:** Skips the rest of the code inside the current iteration of the loop and proceeds to the next iteration.",
          "- **`else` Clause in Loops (less common):** A `for` or `while` loop can have an `else` clause. This clause is executed when the loop terminates normally (i.e., not by a `break` statement)."
        ],
        codeExamples: [
          { 
            id: 'ce-2-2-1', 
            title: 'For Loop with range()', 
            code: "for i in range(5):  # range(5) generates numbers 0, 1, 2, 3, 4\n    print(f\"Iteration {i}\")", 
            explanation: "This loop prints numbers from 0 up to (but not including) 5." 
          },
          {
            id: 'ce-2-2-2',
            title: 'For Loop over a List',
            code: "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit.capitalize())",
            explanation: "This loop iterates through each item in the `fruits` list and prints its capitalized version."
          },
          {
            id: 'ce-2-2-3',
            title: 'While Loop',
            code: "count = 0\nwhile count < 3:\n    print(f\"Count is {count}\")\n    count += 1  # Important: update counter to eventually make condition false\nprint(\"Loop finished\")",
            explanation: "This loop prints the count from 0 to 2. The `count += 1` is crucial to avoid an infinite loop."
          },
          {
            id: 'ce-2-2-4',
            title: 'Loop with break and continue',
            code: "numbers = [1, 2, 3, 4, 5, 6, 7]\nfor num in numbers:\n    if num == 3:\n        continue  # Skip printing 3 and go to next iteration\n    if num == 6:\n        break     # Exit loop when num is 6\n    print(num)\nprint(\"After loop\")",
            explanation: "The loop prints 1, 2, 4, 5. It skips 3 due to `continue` and stops before 6 due to `break`."
          }
        ],
        quiz: [
          { id: 'q-2-2-1', questionText: "Which loop is typically used when you want to iterate over a known sequence of items?", options: ["while loop", "if loop", "for loop", "repeat loop"], correctOptionIndex: 2, explanation: "`for` loops are ideal for iterating over sequences like lists, strings, or ranges." },
          { id: 'q-2-2-2', questionText: "What does the `continue` statement do in a loop?", options: ["Exits the loop immediately", "Restarts the entire script", "Skips the current iteration and proceeds to the next", "Pauses the loop"], correctOptionIndex: 2, explanation: "`continue` skips the remaining code in the current loop iteration and moves to the next one." },
          { id: 'q-2-2-3', questionText: "What sequence of numbers will `range(1, 4)` produce?", options: ["1, 2, 3, 4", "0, 1, 2, 3", "1, 2, 3", "1, 4"], correctOptionIndex: 2, explanation: "`range(start, stop)` generates numbers from `start` up to (but not including) `stop`." }
        ]
      }
    ]
  },
  // MODULE 3: Data Structures (Phase 2 continued)
  {
    id: 'module-3',
    title: 'Data Structures',
    description: 'Learn to organize and manage collections of data effectively using Python\'s built-in structures.',
    isPremium: false,
    topics: [
      {
        id: 'topic-3-1',
        title: 'Lists',
        contentParagraphs: [
          "A **list** is an ordered and mutable (changeable) collection of items. Lists can contain items of different data types.",
          "**Creating Lists:** Defined using square brackets `[]`, with items separated by commas.",
          "**Accessing Items (Indexing):** Use square brackets with the index of the item. Python lists are 0-indexed (the first item is at index 0). Negative indexing can be used to access items from the end (e.g., `-1` is the last item).",
          "**Slicing:** Extract a portion of a list using `my_list[start:end:step]`. The `end` index is exclusive.",
          "**Mutability:** You can change, add, or remove items from a list after it's created.",
          "**Common List Methods:**\n- `append(item)`: Adds an item to the end of the list.\n- `insert(index, item)`: Inserts an item at a specific position.\n- `remove(item)`: Removes the first occurrence of an item.\n- `pop(index)`: Removes and returns the item at a specific index (or the last item if index is not specified).\n- `sort()`: Sorts the list in place (modifies the original list).\n- `reverse()`: Reverses the elements of the list in place.\n- `len(list)`: Returns the number of items in the list (this is a built-in function, not a method).",
          "**List Comprehensions:** A concise way to create lists. Example: `squares = [x**2 for x in range(10)]`."
        ],
        codeExamples: [
          { 
            id: 'ce-3-1-1', 
            title: 'Creating and Accessing Lists', 
            code: "my_list = [10, \"hello\", 3.14, True]\nprint(my_list[0])      # Output: 10\nprint(my_list[1])      # Output: hello\nprint(my_list[-1])     # Output: True (last item)\n\n# Slicing\nprint(my_list[1:3])    # Output: ['hello', 3.14]", 
            explanation: "Lists are 0-indexed. Slicing extracts sub-lists." 
          },
          {
            id: 'ce-3-1-2',
            title: 'Modifying Lists and Common Methods',
            code: "numbers = [1, 5, 2, 8, 3]\nnumbers.append(10)\nprint(numbers)  # Output: [1, 5, 2, 8, 3, 10]\n\nnumbers.insert(1, 100) # Insert 100 at index 1\nprint(numbers)  # Output: [1, 100, 5, 2, 8, 3, 10]\n\nnumbers.remove(5)\nprint(numbers)  # Output: [1, 100, 2, 8, 3, 10]\n\nnumbers.sort()\nprint(numbers)  # Output: [1, 2, 3, 8, 10, 100]\n\nprint(f\"Length of list: {len(numbers)}\")",
            explanation: "Lists are mutable, and various methods allow for modification and inspection."
          },
           {
            id: 'ce-3-1-3',
            title: 'List Comprehension',
            code: "squares = [x*x for x in range(1, 6)] # Squares of numbers from 1 to 5\nprint(squares) # Output: [1, 4, 9, 16, 25]\n\neven_numbers = [num for num in range(10) if num % 2 == 0]\nprint(even_numbers) # Output: [0, 2, 4, 6, 8]",
            explanation: "List comprehensions provide a compact way to create lists based on existing iterables."
          }
        ],
        quiz: [
          { id: 'q-3-1-1', questionText: "Are Python lists mutable or immutable?", options: ["Mutable", "Immutable"], correctOptionIndex: 0, explanation: "Lists are mutable, meaning their contents can be changed after creation." },
          { id: 'q-3-1-2', questionText: "Which method is used to add an element to the end of a list?", options: ["add()", "insert()", "extend()", "append()"], correctOptionIndex: 3, explanation: "The `append()` method adds a single element to the end of a list." },
          { id: 'q-3-1-3', questionText: "If `my_list = [10, 20, 30, 40, 50]`, what is `my_list[1:3]`?", options: ["[20, 30]", "[10, 20]", "[20, 30, 40]", "[10, 20, 30]"], correctOptionIndex: 0, explanation: "Slicing `my_list[start:end]` extracts elements from `start` up to, but not including, `end`. So, it's items at index 1 and 2." }
        ]
      },
      {
        id: 'topic-3-2',
        title: 'Tuples',
        contentParagraphs: [
          "A **tuple** is an ordered and **immutable** (unchangeable) collection of items. Tuples can contain items of different data types.",
          "**Creating Tuples:** Defined using parentheses `()`, with items separated by commas. Parentheses are optional if the context is clear, but it's good practice to use them. A tuple with a single item needs a trailing comma (e.g., `(5,)`).",
          "**Accessing Items (Indexing & Slicing):** Works the same way as lists (0-indexed, negative indexing, slicing).",
          "**Immutability:** Once a tuple is created, you **cannot** change, add, or remove items. This is the key difference from lists.",
          "**Why use Tuples?**\n- **Data Integrity:** Useful when you have a collection of items that should not change (e.g., coordinates (x, y), RGB color values).\n- **Performance:** Tuples can be slightly more memory-efficient and faster to iterate over than lists in some cases (though this difference is often negligible for small collections).\n- **Dictionary Keys:** Tuples can be used as keys in dictionaries (because they are immutable), whereas lists cannot.",
          "**Common Tuple Operations:**\n- `len(tuple)`: Returns the number of items.\n- `count(item)`: Returns the number of times an item appears.\n- `index(item)`: Returns the index of the first occurrence of an item."
        ],
        codeExamples: [
          { 
            id: 'ce-3-2-1', 
            title: 'Creating and Accessing Tuples', 
            code: "my_tuple = (10, \"world\", 2.71, False)\nprint(my_tuple[0])     # Output: 10\nprint(my_tuple[-1])    # Output: False\n\n# Slicing\nprint(my_tuple[1:3])   # Output: ('world', 2.71)\n\n# Single item tuple needs a comma\nsingle_item_tuple = (\"apple\",)\nprint(type(single_item_tuple))", 
            explanation: "Tuples are similar to lists for access but are immutable."
          },
          {
            id: 'ce-3-2-2',
            title: 'Immutability Demonstration',
            code: "point = (3, 5)\n# The following lines would cause errors:\n# point[0] = 7  # TypeError: 'tuple' object does not support item assignment\n# point.append(9) # AttributeError: 'tuple' object has no attribute 'append'\n\nprint(f\"Original tuple: {point}\")\n\n# You can create a new tuple based on an old one\nnew_point = point + (10,)\nprint(f\"New tuple: {new_point}\") # Output: (3, 5, 10)",
            explanation: "Tuples cannot be changed after creation. Operations that seem to modify them actually create new tuples."
          }
        ],
        quiz: [
          { id: 'q-3-2-1', questionText: "What is the main difference between a list and a tuple?", options: ["Lists are ordered, tuples are unordered", "Lists can store mixed data types, tuples cannot", "Lists are mutable, tuples are immutable", "Lists use `[]`, tuples use `{}`"], correctOptionIndex: 2, explanation: "The primary distinction is that lists can be changed (mutable), while tuples cannot be changed after creation (immutable)." },
          { id: 'q-3-2-2', questionText: "How do you define a tuple with only one element, say the number 5?", options: ["`(5)`", "`[5,]`", "`(5,)`", "`{5,}`"], correctOptionIndex: 2, explanation: "A single-element tuple requires a trailing comma: `(5,)`." },
          { id: 'q-3-2-3', questionText: "Can tuples be used as keys in a Python dictionary?", options: ["Yes, always", "No, never", "Only if they contain strings", "Yes, because they are immutable"], correctOptionIndex: 3, explanation: "Immutable objects like tuples can be used as dictionary keys. Lists, being mutable, cannot." }
        ]
      },
      {
        id: 'topic-3-3',
        title: 'Dictionaries',
        contentParagraphs: [
          "A **dictionary (`dict`)** is an unordered (in Python versions before 3.7, ordered in 3.7+) collection of **key-value pairs**. Dictionaries are mutable.",
          "**Key Characteristics:**\n- Each key must be unique within a dictionary.\n- Keys must be of an immutable type (e.g., strings, numbers, tuples). Lists cannot be keys.\n- Values can be of any data type and can be duplicated.",
          "**Creating Dictionaries:** Defined using curly braces `{}`, with key-value pairs separated by colons `:` and pairs separated by commas. Or using the `dict()` constructor.",
          "**Accessing Values:** Use square brackets with the key (e.g., `my_dict['key']`). If the key doesn't exist, this raises a `KeyError`.",
          "- **`get(key, default_value)` method:** A safer way to access values. Returns the value for `key` if it exists, otherwise returns `default_value` (or `None` if `default_value` is not provided), without raising an error.",
          "**Modifying Dictionaries:**\n- Add or update a key-value pair: `my_dict['new_key'] = 'new_value'` or `my_dict['existing_key'] = 'updated_value'`.\n- Remove a pair: `pop(key)` (removes and returns value), `del my_dict['key']`.",
          "**Common Dictionary Methods:**\n- `keys()`: Returns a view object of all keys.\n- `values()`: Returns a view object of all values.\n- `items()`: Returns a view object of all key-value pairs (as tuples).\n- `clear()`: Removes all items.",
          "**Iterating through Dictionaries:** You can loop through keys, values, or key-value pairs."
        ],
        codeExamples: [
          { 
            id: 'ce-3-3-1', 
            title: 'Creating and Accessing Dictionaries', 
            code: "student = {\n    \"name\": \"Alice\",\n    \"age\": 20,\n    \"major\": \"Computer Science\"\n}\nprint(student['name'])  # Output: Alice\nprint(student.get('age')) # Output: 20\nprint(student.get('grade', 'N/A')) # Output: N/A (grade key doesn't exist)\n\n# Adding a new key-value pair\nstudent['year'] = 3\nprint(student)", 
            explanation: "Dictionaries store data as key-value pairs. `get()` is safer for accessing."
          },
          {
            id: 'ce-3-3-2',
            title: 'Modifying and Iterating Dictionaries',
            code: "person = {'city': 'New York', 'country': 'USA'}\n\n# Updating a value\nperson['city'] = 'Boston'\n\n# Removing a key-value pair\nremoved_value = person.pop('country') # Can also use: del person['country']\nprint(f\"Removed: {removed_value}\")\nprint(person) # Output: {'city': 'Boston'}\n\nperson['occupation'] = 'Engineer'\n\nprint(\"\\nIterating through keys:\")\nfor key in person.keys():\n    print(key)\n\nprint(\"\\nIterating through values:\")\nfor value in person.values():\n    print(value)\n\nprint(\"\\nIterating through key-value pairs:\")\nfor key, value in person.items():\n    print(f\"{key}: {value}\")",
            explanation: "Dictionaries are mutable. You can iterate over their keys, values, or items."
          }
        ],
        quiz: [
          { id: 'q-3-3-1', questionText: "What are the main components of a dictionary item?", options: ["Index and value", "Key and value", "Element and attribute", "Name and type"], correctOptionIndex: 1, explanation: "Dictionaries store data in key-value pairs." },
          { id: 'q-3-3-2', questionText: "Can a list be used as a key in a Python dictionary?", options: ["Yes, always", "No, because lists are mutable", "Only if the list contains strings", "Yes, but it's not recommended"], correctOptionIndex: 1, explanation: "Dictionary keys must be immutable. Lists are mutable, so they cannot be used as keys." },
          { id: 'q-3-3-3', questionText: "If `my_dict = {'a': 1, 'b': 2}`, what does `my_dict.get('c', 0)` return?", options: ["KeyError", "None", "0", "2"], correctOptionIndex: 2, explanation: "The `get()` method returns the value for a key if it exists, or the specified default value (0 in this case) if the key is not found, without raising an error." }
        ]
      },
      {
        id: 'topic-3-4',
        title: 'Sets',
        contentParagraphs: [
          "A **set** is an unordered collection of **unique** items. Sets are mutable.",
          "**Key Characteristics:**\n- Items in a set are unordered, meaning they don't maintain any specific sequence.",
          "- Sets automatically discard duplicate items.",
          "- Set items must be immutable (just like dictionary keys).",
          "**Creating Sets:** Defined using curly braces `{}` or the `set()` constructor. To create an empty set, you **must** use `set()`, because `{}` creates an empty dictionary.",
          "**Adding and Removing Items:**\n- `add(item)`: Adds an item to the set.\n- `remove(item)`: Removes an item. Raises a `KeyError` if the item is not found.\n- `discard(item)`: Removes an item if it's present, but does nothing (no error) if it's not.",
          "- `pop()`: Removes and returns an arbitrary item from the set (since sets are unordered).\n- `clear()`: Removes all items.",
          "**Set Operations:** Sets are useful for mathematical set operations:\n- **Union (`|` or `union()`):** Returns a new set containing all items from both sets.\n- **Intersection (`&` or `intersection()`):** Returns a new set containing only items present in both sets.\n- **Difference (`-` or `difference()`):** Returns a new set containing items from the first set that are not in the second.\n- **Symmetric Difference (`^` or `symmetric_difference()`):** Returns a new set containing items from either set but not both."
        ],
        codeExamples: [
          { 
            id: 'ce-3-4-1', 
            title: 'Creating and Modifying Sets', 
            code: "my_set = {1, 2, 3, 2, 1} # Duplicates are automatically removed\nprint(my_set)  # Output: {1, 2, 3} (order may vary)\n\nempty_set = set() # Creating an empty set\n\nmy_set.add(4)\nmy_set.add(1) # Adding an existing item does nothing new\nprint(my_set)  # Output: {1, 2, 3, 4}\n\nmy_set.remove(2)\nmy_set.discard(10) # 10 is not in the set, no error\nprint(my_set)  # Output: {1, 3, 4}", 
            explanation: "Sets store unique, unordered items. `add()` adds elements, `remove()` or `discard()` removes them."
          },
          {
            id: 'ce-3-4-2',
            title: 'Set Operations',
            code: "set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\n\nprint(f\"Union: {set_a | set_b}\")             # Output: {1, 2, 3, 4, 5, 6}\nprint(f\"Intersection: {set_a & set_b}\")       # Output: {3, 4}\nprint(f\"Difference (A-B): {set_a - set_b}\")     # Output: {1, 2}\nprint(f\"Symmetric Diff: {set_a ^ set_b}\") # Output: {1, 2, 5, 6}",
            explanation: "Sets support powerful operations like union, intersection, difference, and symmetric difference."
          }
        ],
        quiz: [
          { id: 'q-3-4-1', questionText: "What is a key characteristic of Python sets?", options: ["They are ordered", "They allow duplicate items", "They only store unique items", "Items are accessed by index"], correctOptionIndex: 2, explanation: "Sets are collections of unique items; duplicates are automatically removed." },
          { id: 'q-3-4-2', questionText: "How do you create an empty set in Python?", options: ["`{}`", "`[]`", "`()`", "`set()`"], correctOptionIndex: 3, explanation: "Using `set()` creates an empty set. `{}` creates an empty dictionary." },
          { id: 'q-3-4-3', questionText: "Which set operation returns elements that are in either set, but not in their intersection?", options: ["Union", "Intersection", "Difference", "Symmetric Difference"], correctOptionIndex: 3, explanation: "Symmetric difference (`^` or `symmetric_difference()`) returns items present in one set or the other, but not in both." }
        ]
      }
    ]
  },
  // MODULE 4: Functions (Phase 3)
  {
    id: 'module-4',
    title: 'Functions',
    description: 'Master functions to write reusable, organized, and modular code.',
    isPremium: true,
    topics: [
      {
        id: 'topic-4-1',
        title: 'Defining and Calling Functions',
        contentParagraphs: [
          "**Functions** are reusable blocks of code that perform a specific task. They help make your code more organized, readable, and reduce repetition.",
          "**Defining a Function:**\n- Use the `def` keyword, followed by the function name, parentheses `()`, and a colon `:`. E.g., `def my_function():`\n- The code block within the function must be indented.",
          "**Calling a Function:** To execute a function, you simply type its name followed by parentheses. E.g., `my_function()`.",
          "**Parameters and Arguments:**\n- **Parameters** are variables listed inside the parentheses in the function definition. They act as placeholders for values that will be passed into the function.\n- **Arguments** are the actual values you pass to the function when you call it.",
          "**The `return` Statement:**\n- Functions can optionally send a value back to the caller using the `return` statement.\n- When a `return` statement is executed, the function immediately stops, and the specified value is returned.\n- If a function doesn't have an explicit `return` statement, or if `return` is used without an expression, it implicitly returns `None`.",
          "**Docstrings (Documentation Strings):** It's good practice to include a multi-line string (docstring) right after the function definition line to explain what the function does, its parameters, and what it returns. These can be accessed using `help(function_name)` or `function_name.__doc__`."
        ],
        codeExamples: [
          { 
            id: 'ce-4-1-1', 
            title: 'Simple Function without Parameters', 
            code: "def greet():\n    \"\"\"This function prints a simple greeting.\"\"\"\n    message = \"Hello from a function!\"\n    print(message)\n\n# Call the function\ngreet()", 
            explanation: "This defines and calls a simple function `greet` that prints a message."
          },
          {
            id: 'ce-4-1-2',
            title: 'Function with Parameters and Return Value',
            code: "def add_numbers(x, y):\n    \"\"\"Adds two numbers and returns the sum.\"\"\"\n    sum_result = x + y\n    return sum_result\n\n# Call the function and store the result\nresult = add_numbers(5, 3)\nprint(f\"The sum is: {result}\") # Output: The sum is: 8\n\nresult2 = add_numbers(10.5, 20.2)\nprint(f\"Another sum: {result2}\") # Output: Another sum: 30.7",
            explanation: "`add_numbers` takes two parameters (`x`, `y`), calculates their sum, and returns it."
          }
        ],
        quiz: [
          { id: 'q-4-1-1', questionText: "What keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], correctOptionIndex: 2, explanation: "The `def` keyword is used to start a function definition." },
          { id: 'q-4-1-2', questionText: "What is the value returned by a Python function if it does not have an explicit `return` statement?", options: ["0", "True", "None", "It causes an error"], correctOptionIndex: 2, explanation: "If a function doesn't explicitly return a value, it implicitly returns `None`." },
          { id: 'q-4-1-3', questionText: "In `def my_func(name):`, what is `name` called?", options: ["Argument", "Variable", "Parameter", "Return value"], correctOptionIndex: 2, explanation: "`name` in the function definition is a parameter, a placeholder for the value that will be passed in when the function is called." }
        ]
      },
      {
        id: 'topic-4-2',
        title: 'Advanced Function Concepts',
        contentParagraphs: [
          "**Default Argument Values:** You can provide default values for parameters. If an argument for that parameter is not provided during the function call, the default value is used.",
          "**Keyword Arguments:** You can pass arguments using `parameter_name=value` syntax. This allows you to pass arguments out of order and makes function calls more readable, especially for functions with many parameters.",
          "**Variable-Length Arguments:**\n- **`*args` (Arbitrary Positional Arguments):** Collects any extra positional arguments passed to the function into a tuple. The name `args` is a convention; you could use `*my_numbers`.\n- **`**kwargs` (Arbitrary Keyword Arguments):** Collects any extra keyword arguments into a dictionary. The name `kwargs` is a convention.",
          "**Scope (LEGB Rule):** Scope determines the visibility of a variable. Python follows the LEGB rule for looking up variable names:\n- **L (Local):** Variables defined inside the current function.\n- **E (Enclosing function locals):** Variables in the local scope of any enclosing functions (for nested functions).\n- **G (Global):** Variables defined at the top level of a module, or declared global in a function using the `global` keyword.\n- **B (Built-in):** Names pre-assigned in Python (e.g., `len()`, `print()`).",
          "  - Use the `global` keyword to modify a global variable from inside a function.\n  - Use the `nonlocal` keyword to modify a variable in an enclosing function's scope (but not global).",
          "**Lambda Functions (Anonymous Functions):** Small, unnamed functions defined using the `lambda` keyword. They are restricted to a single expression.\nSyntax: `lambda arguments: expression`."
        ],
        codeExamples: [
          { 
            id: 'ce-4-2-1', 
            title: 'Default Arguments and Keyword Arguments', 
            code: "def greet_user(name, greeting=\"Hello\"):\n    print(f\"{greeting}, {name}!\")\n\ngreet_user(\"Alice\")                 # Uses default greeting: Hello, Alice!\ngreet_user(\"Bob\", greeting=\"Hi\")    # Keyword argument, overrides default: Hi, Bob!\ngreet_user(name=\"Charlie\", greeting=\"Good day\") # All keyword args: Good day, Charlie!", 
            explanation: "Default arguments provide flexibility. Keyword arguments improve clarity."
          },
          {
            id: 'ce-4-2-2',
            title: 'Using *args and **kwargs',
            code: "def print_info(name, age, *skills, **details):\n    print(f\"Name: {name}, Age: {age}\")\n    if skills:\n        print(\"Skills:\", \", \".join(skills))\n    if details:\n        print(\"Details:\")\n        for key, value in details.items():\n            print(f\"  {key}: {value}\")\n\nprint_info(\"David\", 25, \"Python\", \"SQL\", city=\"London\", status=\"Active\")",
            explanation: "`*skills` collects ('Python', 'SQL') into a tuple. `**details` collects {'city': 'London', 'status': 'Active'} into a dictionary."
          },
          {
            id: 'ce-4-2-3',
            title: 'Lambda Function',
            code: "multiply = lambda x, y: x * y\nprint(multiply(5, 4))  # Output: 20\n\nnumbers = [1, 2, 3, 4, 5]\nsquared_numbers = list(map(lambda x: x**2, numbers))\nprint(squared_numbers) # Output: [1, 4, 9, 16, 25]",
            explanation: "Lambda functions are useful for short, anonymous operations, often with functions like `map()` or `filter()`."
          },
          {
            id: 'ce-4-2-4',
            title: 'Scope Example',
            code: "x = \"global\"\n\ndef outer_func():\n    y = \"outer_local\"\n    def inner_func():\n        z = \"inner_local\"\n        print(f\"Inside inner: x={x}, y={y}, z={z}\")\n    inner_func()\n\nouter_func() # Accesses global x and outer_local y",
            explanation: "Demonstrates how inner functions can access variables from outer scopes (enclosing and global)."
          }
        ],
        quiz: [
          { id: 'q-4-2-1', questionText: "How can you define a function parameter `count` to have a default value of 10?", options: ["`def func(count is 10):`", "`def func(default count = 10):`", "`def func(count: 10):`", "`def func(count=10):`"], correctOptionIndex: 3, explanation: "Default argument values are specified using `parameter_name=value` in the function definition." },
          { id: 'q-4-2-2', questionText: "In a function definition, what does `*args` allow you to do?", options: ["Pass arguments by keyword only", "Collect extra positional arguments into a tuple", "Define the return type of the function", "Specify required arguments"], correctOptionIndex: 1, explanation: "`*args` collects any additional positional arguments passed to the function into a tuple." },
          { id: 'q-4-2-3', questionText: "What is a key characteristic of a lambda function?", options: ["It can contain multiple statements", "It must have a name", "It is restricted to a single expression", "It cannot have arguments"], correctOptionIndex: 2, explanation: "Lambda functions are designed for simple, single-expression operations and are anonymous." }
        ]
      }
    ]
  },
  // MODULE 5: Modules and Packages (Phase 3 continued)
  {
    id: 'module-5',
    title: 'Modules and Packages',
    description: 'Organize your code into reusable modules and leverage Python\'s vast ecosystem of packages.',
    isPremium: true,
    topics: [
      {
        id: 'topic-5-1',
        title: 'Using Modules',
        contentParagraphs: [
          "**What are Modules?** A module is simply a Python file (`.py`) containing definitions and statements (functions, classes, variables). Modules allow you to logically organize your Python code and make it reusable across different programs.",
          "**Why use Modules?**\n- **Organization:** Break down large programs into smaller, manageable files.\n- **Reusability:** Use the same code in multiple projects without copying and pasting.\n- **Namespace Management:** Avoid naming conflicts by keeping code in separate namespaces.",
          "**The `import` Statement:** To use the contents of a module in your current script, you use the `import` statement.",
          "  - `import module_name`: Imports the entire module. You then access its contents using `module_name.function_name` or `module_name.variable_name`.",
          "  - `from module_name import item1, item2`: Imports specific items (functions, classes, variables) directly into your current script's namespace. You can then use `item1` directly without prefixing it with the module name.",
          "  - `from module_name import *`: Imports all names from the module into the current namespace. **Generally discouraged** as it can lead to naming conflicts and make code harder to read.",
          "  - `import module_name as alias`: Imports a module and gives it an alias (a shorter name) for convenience (e.g., `import pandas as pd`).",
          "**Python's Standard Library:** Python comes with a rich standard library – a collection of modules that provide a wide range of functionalities. You don't need to install these separately.",
          "  - **`math` module:** Provides mathematical functions (e.g., `math.sqrt()`, `math.pi`, `math.sin()`).",
          "  - **`random` module:** For generating random numbers (e.g., `random.randint()`, `random.choice()`, `random.shuffle()`).",
          "  - **`datetime` module:** For working with dates and times.",
          "  - **`os` module:** Provides functions for interacting with the operating system (e.g., file system operations).",
          "  - **`json` module:** For working with JSON data.",
          "  - **`csv` module:** For reading and writing CSV files."
        ],
        codeExamples: [
          { 
            id: 'ce-5-1-1', 
            title: 'Importing and Using the `math` Module', 
            code: "import math\n\nradius = 5\narea = math.pi * (radius ** 2)\nprint(f\"The area of a circle with radius {radius} is {area:.2f}\")\n\nprint(f\"The square root of 16 is {math.sqrt(16)}\")", 
            explanation: "The `math` module is imported, and its `pi` constant and `sqrt()` function are used."
          },
          {
            id: 'ce-5-1-2',
            title: 'Importing Specific Items with `from`',
            code: "from random import randint, choice\n\nrandom_number = randint(1, 10) # Generates a random integer between 1 and 10 (inclusive)\nprint(f\"Random number: {random_number}\")\n\nmy_list = [\"apple\", \"banana\", \"cherry\"]\nrandom_fruit = choice(my_list) # Selects a random item from the list\nprint(f\"Random fruit: {random_fruit}\")",
            explanation: "`randint` and `choice` are imported directly from the `random` module, so no module prefix is needed when calling them."
          }
        ],
        quiz: [
          { id: 'q-5-1-1', questionText: "What is a Python module?", options: ["A built-in data type", "A Python file containing definitions and statements", "A special kind of loop", "A way to handle errors"], correctOptionIndex: 1, explanation: "A module is a `.py` file that can contain functions, classes, and variables, allowing for code organization and reuse." },
          { id: 'q-5-1-2', questionText: "If you import a module like `import math`, how would you access its `sqrt` function?", options: ["`sqrt()`", "`math.sqrt()`", "`import sqrt from math`", "`math->sqrt()`"], correctOptionIndex: 1, explanation: "When importing an entire module, you access its members using `module_name.member_name`." },
          { id: 'q-5-1-3', questionText: "Which of these is a module from Python's Standard Library used for generating random numbers?", options: ["`number_utils`", "`random`", "`statistics`", "`crypto`"], correctOptionIndex: 1, explanation: "The `random` module is part of the standard library and provides functions for random number generation." }
        ]
      },
      {
        id: 'topic-5-2',
        title: 'Creating Modules and Using pip',
        contentParagraphs: [
          "**Creating Your Own Modules:** Any Python file can be a module. To create one:",
          "1.  Create a new Python file (e.g., `my_utils.py`).",
          "2.  Define functions, classes, or variables within this file.",
          "3.  Save the file.",
          "4.  In another Python script (in the same directory, or a directory Python knows about via `sys.path`), you can then import your module: `import my_utils` or `from my_utils import specific_function`.",
          "   - The **`if __name__ == \"__main__\":`** block: Often, you'll see this construct in modules. Code inside this block will only run when the module is executed directly as a script, not when it's imported by another script. This is useful for including test code or example usage within the module file itself.",
          "**Packages:** A package is a collection of related modules organized in a directory hierarchy. A directory becomes a Python package if it contains a special file named `__init__.py` (which can be empty). Packages help organize larger projects.",
          "**`pip` - Python's Package Installer:** Python has a vast ecosystem of third-party packages (libraries written by others) available on the Python Package Index (PyPI). `pip` is the command-line tool used to install and manage these packages.",
          "  - **Installing a package:** `pip install package_name` (e.g., `pip install requests`).\n    You usually run this in your terminal or command prompt.",
          "  - **Listing installed packages:** `pip list`",
          "  - **Uninstalling a package:** `pip uninstall package_name`",
          "  - **Freezing requirements:** `pip freeze > requirements.txt` (Saves a list of installed packages and their versions to a file, useful for sharing projects).",
          "  - **Installing from requirements:** `pip install -r requirements.txt` (Installs all packages listed in a `requirements.txt` file)."
        ],
        codeExamples: [
          { 
            id: 'ce-5-2-1', 
            title: 'Example: Creating a Simple Module (`greetings.py`)', 
            code: "# File: greetings.py\n\ndef say_hello(name):\n    return f\"Hello, {name}!\"\n\ndef say_goodbye(name):\n    return f\"Goodbye, {name}.\"\n\n# This part runs only if greetings.py is executed directly\nif __name__ == \"__main__\":\n    print(say_hello(\"Developer\"))\n    print(\"This is being run directly.\")", 
            explanation: "This would be saved as `greetings.py`. The `if __name__ == \"__main__\":` block is for code that should run when this file is the main script."
          },
          {
            id: 'ce-5-2-2',
            title: 'Example: Using the Created Module (`main_app.py`)',
            code: "# File: main_app.py (in the same directory as greetings.py)\n\nimport greetings # Import the entire module\n\nmessage1 = greetings.say_hello(\"Alice\")\nprint(message1)\n\nfrom greetings import say_goodbye # Import a specific function\n\nmessage2 = say_goodbye(\"Bob\")\nprint(message2)",
            explanation: "This script `main_app.py` imports and uses functions from the `greetings.py` module."
          }
        ],
        quiz: [
          { id: 'q-5-2-1', questionText: "What is `pip` primarily used for?", options: ["Running Python scripts", "Debugging Python code", "Installing and managing third-party Python packages", "Creating Python documentation"], correctOptionIndex: 2, explanation: "`pip` is Python's package installer, used to download and manage libraries from PyPI." },
          { id: 'q-5-2-2', questionText: "What is the purpose of the `if __name__ == \"__main__\":` block in a Python module?", options: ["It's required for all modules to function", "It defines the main class of the module", "Code inside it only runs if the module is executed directly, not when imported", "It's a special type of comment"], correctOptionIndex: 2, explanation: "This block allows a module to have code that runs for testing or direct execution, but not when it's imported as a library into another script." },
          { id: 'q-5-2-3', questionText: "If you create a file `my_math_tools.py` with a function `add(x,y)`, how would you import and use it in another script in the same directory?", options: ["`load my_math_tools; result = add(2,3)`", "`import my_math_tools; result = my_math_tools.add(2,3)`", "`include my_math_tools; result = add(2,3)`", "`from my_math_tools.add import *; result = add(2,3)`"], correctOptionIndex: 1, explanation: "A common way is to `import module_name` and then access functions using `module_name.function_name()`." }
        ]
      }
    ]
  },
  // MODULE 6: Object-Oriented Programming (OOP) (Phase 4)
  {
    id: 'module-6',
    title: 'Object-Oriented Programming (OOP)',
    description: 'Learn the principles of OOP to create well-structured and maintainable applications.',
    isPremium: true,
    topics: [
      {
        id: 'topic-6-1',
        title: 'Introduction to OOP: Classes and Objects',
        contentParagraphs: [
          "**Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of \"objects\", which can contain data in the form of fields (often known as attributes or properties) and code in the form of procedures (often known as methods).",
          "**Key OOP Concepts:**\n- **Class:** A blueprint or template for creating objects. It defines a set of attributes and methods that the created objects will have.\n- **Object (Instance):** A specific instance of a class. You can create many objects from a single class.\n- **Encapsulation:** Bundling data (attributes) and methods that operate on the data within a single unit (the object). This helps in hiding internal implementation details.",
          "- **Abstraction:** Hiding complex implementation details and showing only the essential features of the object.",
          "- **Inheritance:** A mechanism where a new class (subclass or derived class) inherits attributes and methods from an existing class (superclass or base class). This promotes code reuse.",
          "- **Polymorphism:** The ability of an object to take on many forms. Often, this means that a method can behave differently depending on the object it's called on.",
          "**Why OOP?** Structure, reusability, maintainability, modeling real-world entities.",
          "**Defining Classes:** Use the `class` keyword.",
          "**Creating Objects (Instances):** Call the class name as if it were a function: `my_object = MyClass()`.",
          "**The `__init__` Method (Constructor):** A special method that gets called automatically when you create a new object (instance) of a class. It's used to initialize the object's attributes. The first parameter of `__init__` (and instance methods) is always `self`, which refers to the instance being created or acted upon.",
          "**Instance Attributes:** Variables that belong to a specific instance of a class. They are defined within methods (usually `__init__`) using `self.attribute_name = value`.",
          "**Instance Methods:** Functions defined inside a class that operate on instances of that class. Their first parameter is always `self`."
        ],
        codeExamples: [
          { 
            id: 'ce-6-1-1', 
            title: 'Defining a Simple Class and Creating Objects', 
            code: "class Dog:\n    # The __init__ method is the constructor\n    def __init__(self, name, breed):\n        # Instance attributes\n        self.name = name\n        self.breed = breed\n        self.tricks = [] # Each dog has its own list of tricks\n\n    # An instance method\n    def bark(self):\n        return f\"{self.name} says Woof!\"\n    \n    def add_trick(self, trick):\n        self.tricks.append(trick)\n\n# Creating Dog objects (instances of the Dog class)\ndog1 = Dog(\"Buddy\", \"Golden Retriever\")\ndog2 = Dog(\"Lucy\", \"Poodle\")\n\nprint(f\"{dog1.name} is a {dog1.breed}.\") # Accessing attributes\nprint(dog2.bark()) # Calling an instance method\n\ndog1.add_trick(\"fetch\")\ndog2.add_trick(\"sit\")\nprint(f\"{dog1.name}'s tricks: {dog1.tricks}\")\nprint(f\"{dog2.name}'s tricks: {dog2.tricks}\")",
            explanation: "The `Dog` class defines a blueprint. `dog1` and `dog2` are distinct objects created from this blueprint, each with its own `name` and `breed`."
          }
        ],
        quiz: [
          { id: 'q-6-1-1', questionText: "In OOP, what is a 'class'?", options: ["A specific instance of an object", "A blueprint for creating objects", "A built-in Python function", "A type of variable"], correctOptionIndex: 1, explanation: "A class is a template or blueprint that defines the properties and behaviors of objects." },
          { id: 'q-6-1-2', questionText: "What is the special method `__init__` used for in a Python class?", options: ["To destroy an object", "To initialize an object's attributes when it's created", "To define how an object is printed", "To inherit from another class"], correctOptionIndex: 1, explanation: "`__init__` is the constructor method; it's called when an object is instantiated to set up its initial state." },
          { id: 'q-6-1-3', questionText: "What does the `self` parameter represent in an instance method of a class?", options: ["The class itself", "The specific instance of the class the method is called on", "A global variable", "The parent class"], correctOptionIndex: 1, explanation: "`self` refers to the particular object (instance) that the method is being invoked upon." }
        ]
      },
      {
        id: 'topic-6-2',
        title: 'Inheritance',
        contentParagraphs: [
          "**Inheritance** is a fundamental OOP concept that allows a class (called a **subclass** or **derived class**) to inherit attributes and methods from another class (called a **superclass**, **base class**, or **parent class**).",
          "**Benefits of Inheritance:**\n- **Code Reusability:** Avoids duplicating code by allowing subclasses to use common functionality defined in superclasses.\n- **Extensibility:** Easily add new features to subclasses without modifying the superclass.\n- **Hierarchical Relationships:** Model 'is-a' relationships (e.g., a `Dog` is an `Animal`).",
          "**Creating Subclasses:** To make a class inherit from another, you put the superclass name in parentheses after the subclass name in its definition: `class SubclassName(SuperclassName):`.",
          "**Method Overriding:** A subclass can provide its own specific implementation of a method that is already defined in its superclass. This is called method overriding.",
          "**The `super()` Function:** Used in a subclass to call a method from its superclass. This is often used in the `__init__` method of a subclass to call the superclass's `__init__` to ensure proper initialization of inherited attributes, or to extend the functionality of an overridden method.",
          "**Multiple Inheritance:** Python supports inheriting from multiple superclasses: `class MyClass(Parent1, Parent2):`. However, this can lead to complexity (e.g., the \"Diamond Problem\") and should be used carefully."
        ],
        codeExamples: [
          { 
            id: 'ce-6-2-1', 
            title: 'Simple Inheritance', 
            code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        # This method is meant to be overridden by subclasses\n        raise NotImplementedError(\"Subclass must implement this abstract method\")\n\nclass Dog(Animal): # Dog inherits from Animal\n    def speak(self): # Overriding the speak method from Animal\n        return f\"{self.name} says Woof!\"\n\nclass Cat(Animal): # Cat inherits from Animal\n    def speak(self): # Overriding the speak method\n        return f\"{self.name} says Meow!\"\n\nmy_dog = Dog(\"Buddy\")\nmy_cat = Cat(\"Whiskers\")\n\nprint(my_dog.speak()) # Output: Buddy says Woof!\nprint(my_cat.speak()) # Output: Whiskers says Meow!",
            explanation: "`Dog` and `Cat` are subclasses of `Animal`. They inherit the `__init__` method and provide their own implementations of the `speak` method."
          },
          {
            id: 'ce-6-2-2',
            title: 'Using super()',
            code: "class Vehicle:\n    def __init__(self, brand):\n        self.brand = brand\n        print(\"Vehicle initialized\")\n\n    def display_brand(self):\n        return f\"Brand: {self.brand}\"\n\nclass Car(Vehicle):\n    def __init__(self, brand, model):\n        super().__init__(brand) # Call the __init__ of the Vehicle class\n        self.model = model\n        print(\"Car initialized\")\n\n    def display_info(self):\n        return f\"{super().display_brand()}, Model: {self.model}\"\n\nmy_car = Car(\"Toyota\", \"Camry\")\n# Output during init:\n# Vehicle initialized\n# Car initialized\n\nprint(my_car.display_info()) # Output: Brand: Toyota, Model: Camry",
            explanation: "`super().__init__(brand)` calls the constructor of the `Vehicle` class from within the `Car` class's constructor. `super().display_brand()` calls the parent's method."
          }
        ],
        quiz: [
          { id: 'q-6-2-1', questionText: "What is the primary benefit of inheritance in OOP?", options: ["Increased program speed", "Reduced memory usage", "Code reusability and creating hierarchical relationships", "Simpler syntax"], correctOptionIndex: 2, explanation: "Inheritance promotes code reuse by allowing subclasses to inherit and extend functionality from superclasses." },
          { id: 'q-6-2-2', questionText: "How do you make a class `Student` inherit from a class `Person` in Python?", options: ["`class Student extends Person:`", "`class Student inherits Person:`", "`class Student(Person):`", "`class Student :: Person:`"], correctOptionIndex: 2, explanation: "Inheritance is specified by putting the parent class name in parentheses after the child class name: `class Child(Parent):`." },
          { id: 'q-6-2-3', questionText: "What is the `super()` function commonly used for in a subclass?", options: ["To access global variables", "To call a method from the subclass's parent class", "To create a new instance of the parent class", "To delete the parent class"], correctOptionIndex: 1, explanation: "`super()` is used to call methods of the immediate parent class, often to extend or initialize inherited behavior." }
        ]
      },
      {
        id: 'topic-6-3',
        title: 'Encapsulation and Special Methods',
        contentParagraphs: [
          "**Encapsulation:** Bundling data (attributes) and the methods that operate on that data within a single unit (an object). A key aspect is **information hiding**, where internal details of an object are hidden from the outside world.",
          "  - **Public attributes/methods:** Accessible from anywhere (default in Python).",
          "  - **\"Protected\" attributes/methods (by convention):** Start with a single underscore (e.g., `_protected_member`). This signals to other developers that it's intended for internal use, but Python doesn't strictly enforce it.",
          "  - **\"Private\" attributes/methods (name mangling):** Start with double underscores (e.g., `__private_member`). Python changes the name to `_ClassName__private_member`, making it harder to access directly from outside (but not impossible).",
          "**Properties (`@property` decorator):** A Pythonic way to manage attribute access, providing getter, setter, and deleter methods while still allowing attribute-like access syntax.",
          "**Special Methods (Dunder Methods):** Methods with double underscores at the beginning and end of their names (e.g., `__init__`, `__str__`). They allow you to define how objects of your class behave with built-in Python operations.",
          "  - `__str__(self)`: Defines the string representation of an object when `str(object)` is called or when the object is printed. Should return a user-friendly string.",
          "  - `__repr__(self)`: Defines the \"official\" string representation of an object. Ideally, `eval(repr(object)) == object`. Should return an unambiguous string, often one that could be used to recreate the object.",
          "  - `__len__(self)`: Called by `len(object)` to get the length of an object.",
          "  - `__add__(self, other)`: Implements the `+` operator.",
          "  - Many others for comparisons (`__eq__`, `__lt__`), iteration (`__iter__`, `__next__`), etc."
        ],
        codeExamples: [
          { 
            id: 'ce-6-3-1', 
            title: 'Encapsulation with \"Private\" Attribute', 
            code: "class BankAccount:\n    def __init__(self, initial_balance):\n        self.__balance = initial_balance # \"Private\" attribute\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n            print(f\"Deposited ${amount}. New balance: ${self.__balance}\")\n        else:\n            print(\"Deposit amount must be positive.\")\n\n    def get_balance(self):\n        return self.__balance\n\naccount = BankAccount(100)\naccount.deposit(50)\n# print(account.__balance) # This would cause an AttributeError (or access the mangled name)\nprint(f\"Current balance: ${account.get_balance()}\")", 
            explanation: "`__balance` is intended as a private attribute. It's accessed indirectly via `get_balance()` and modified by `deposit()`."
          },
          {
            id: 'ce-6-3-2',
            title: 'Using @property for Controlled Access',
            code: "class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius # \"Protected\" attribute\n\n    @property\n    def celsius(self):\n        print(\"Getting Celsius value\")\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value):\n        print(\"Setting Celsius value\")\n        if value < -273.15:\n            raise ValueError(\"Temperature below absolute zero is not possible\")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self):\n        return (self._celsius * 9/5) + 32\n\ntemp = Temperature(25)\nprint(f\"Celsius: {temp.celsius}\")      # Calls the getter\nprint(f\"Fahrenheit: {temp.fahrenheit}\")\ntemp.celsius = 30                    # Calls the setter\nprint(f\"New Celsius: {temp.celsius}\")",
            explanation: "The `@property` decorator allows `celsius` to be accessed like an attribute, but its getting and setting are controlled by methods."
          },
          {
            id: 'ce-6-3-3',
            title: 'Special Methods: __str__ and __len__',
            code: "class Book:\n    def __init__(self, title, author, pages):\n        self.title = title\n        self.author = author\n        self.pages = pages\n\n    def __str__(self):\n        return f\"'{self.title}' by {self.author} ({self.pages} pages)\"\n\n    def __len__(self):\n        return self.pages\n\nmy_book = Book(\"The Great Gatsby\", \"F. Scott Fitzgerald\", 180)\nprint(my_book)  # Calls __str__: 'The Great Gatsby' by F. Scott Fitzgerald (180 pages)\nprint(len(my_book)) # Calls __len__: 180",
            explanation: "`__str__` provides a user-friendly string representation. `__len__` defines what `len()` returns for a `Book` object."
          }
        ],
        quiz: [
          { id: 'q-6-3-1', questionText: "In Python, what is the convention for an attribute intended to be 'protected' (for internal use)?", options: ["No prefix", "Prefix with `private_`", "Prefix with a single underscore `_`", "Prefix with double underscores `__`"], correctOptionIndex: 2, explanation: "A single underscore prefix (`_attribute`) is a convention to indicate that an attribute is for internal use, though Python doesn't strictly enforce it." },
          { id: 'q-6-3-2', questionText: "Which special method is called when you use the `print()` function on an object?", options: ["`__init__()`", "`__repr__()`", "`__print__()`", "`__str__()`"], correctOptionIndex: 3, explanation: "`__str__()` is called to get the informal, user-friendly string representation of an object for printing." },
          { id: 'q-6-3-3', questionText: "What is the primary purpose of the `@property` decorator?", options: ["To make an attribute read-only", "To provide controlled access (getter/setter) to an attribute while maintaining attribute-like syntax", "To automatically document attributes", "To make an attribute private"], correctOptionIndex: 1, explanation: "`@property` allows you to define getter, setter, and deleter methods for an attribute, controlling its access but still allowing it to be used like a simple attribute." }
        ]
      }
    ]
  },
  // MODULE 7: File Handling and Error Handling (Phase 5)
  {
    id: 'module-7',
    title: 'File and Error Handling',
    description: 'Learn to work with files and manage errors gracefully in your Python programs.',
    isPremium: true,
    topics: [
      {
        id: 'topic-7-1',
        title: 'Working with Files',
        contentParagraphs: [
          "File handling is crucial for reading data from and writing data to files on your computer.",
          "**Opening Files:** The `open()` function is used to open a file. It takes two main arguments: the file path and the mode.",
          "  - `file_object = open(\"filename.txt\", \"mode\")`",
          "**Common File Modes:**\n- `'r'`: Read (default). Opens for reading. Error if file doesn't exist.\n- `'w'`: Write. Opens for writing. Creates file if it doesn't exist, **truncates (empties) file if it exists**.\n- `'a'`: Append. Opens for appending. Creates file if it doesn't exist. New data is added to the end.\n- `'r+'`: Read and Write.\n- `'b'`: Binary mode (add to other modes, e.g., `'rb'` or `'wb'`). For non-text files like images or executables.",
          "**Reading from Files:**\n- `file.read(size)`: Reads `size` bytes. If `size` is omitted or negative, reads the entire file.\n- `file.readline()`: Reads a single line from the file (including the newline character `\\n`).\n- `file.readlines()`: Reads all lines into a list of strings.",
          "**Writing to Files:**\n- `file.write(string)`: Writes the given string to the file.\n- `file.writelines(list_of_strings)`: Writes a list of strings to the file (doesn't add newlines automatically).",
          "**Closing Files:** It's very important to close a file after you're done with it using `file.close()`. This ensures data is properly written and resources are freed.",
          "**The `with` Statement (Context Manager):** The recommended way to work with files. It automatically closes the file for you, even if errors occur.",
          "  `with open(\"filename.txt\", \"r\") as f:\n      content = f.read()`",
          "**Working with JSON and CSV Files:**\n- **JSON (JavaScript Object Notation):** A common data format. Python's `json` module (`json.load()`, `json.dump()`) is used to read and write JSON data.\n- **CSV (Comma-Separated Values):** Another common format, especially for tabular data. Python's `csv` module (`csv.reader`, `csv.writer`) helps work with CSV files."
        ],
        codeExamples: [
          { 
            id: 'ce-7-1-1', 
            title: 'Writing to and Reading from a File using `with`', 
            code: "# Writing to a file\nwith open(\"example.txt\", \"w\") as f:\n    f.write(\"Hello, PyMentor!\\n\")\n    f.write(\"This is a second line.\")\n\n# Reading from the file\nwith open(\"example.txt\", \"r\") as f:\n    content = f.read()\n    print(\"File Content:\\n\" + content)\n\n# Appending to the file\nwith open(\"example.txt\", \"a\") as f:\n    f.write(\"\\nThis line is appended.\")\n\n# Reading line by line\nwith open(\"example.txt\", \"r\") as f:\n    print(\"\\nReading line by line:\")\n    for line in f:\n        print(line.strip()) # strip() removes leading/trailing whitespace like \\n",
            explanation: "The `with` statement ensures files are closed automatically. Demonstrates writing, reading, and appending."
          },
          {
            id: 'ce-7-1-2',
            title: 'Working with JSON Data',
            code: "import json\n\ndata = {\n    \"name\": \"PyMentor Student\",\n    \"course\": \"Python Programming\",\n    \"progress\": 75\n}\n\n# Writing JSON to a file\nwith open(\"data.json\", \"w\") as f:\n    json.dump(data, f, indent=4) # indent for pretty printing\n\n# Reading JSON from a file\nwith open(\"data.json\", \"r\") as f:\n    loaded_data = json.load(f)\n    print(f\"\\nLoaded JSON data: {loaded_data}\")\n    print(f\"Course: {loaded_data['course']}\")",
            explanation: "The `json` module makes it easy to serialize Python dictionaries to JSON strings/files and deserialize them back."
          }
        ],
        quiz: [
          { id: 'q-7-1-1', questionText: "What is the recommended way to open and automatically close a file in Python?", options: ["Using `try...finally` with `file.close()`", "Using the `with open(...) as ...:` statement", "Simply calling `open()` and then `close()`", "Using the `file.auto_close()` method"], correctOptionIndex: 1, explanation: "The `with` statement acts as a context manager, ensuring the file is properly closed even if errors occur." },
          { id: 'q-7-1-2', questionText: "Which file mode is used to open a file for writing, creating it if it doesn't exist, and emptying it if it does exist?", options: ["`'r'`", "`'a'`", "`'w'`", "`'r+'`"], correctOptionIndex: 2, explanation: "Mode `'w'` opens for writing. It creates the file if it's missing or truncates (empties) an existing file." },
          { id: 'q-7-1-3', questionText: "Which Python module is commonly used for working with JSON data?", options: ["`pickle`", "`csv`", "`os`", "`json`"], correctOptionIndex: 3, explanation: "The `json` module provides functions like `json.load()` and `json.dump()` for handling JSON." }
        ]
      },
      {
        id: 'topic-7-2',
        title: 'Error and Exception Handling',
        contentParagraphs: [
          "Errors are inevitable in programming. Python provides robust mechanisms for handling them.",
          "**Syntax Errors:** Errors in the structure of your code (e.g., typos, incorrect indentation). Python catches these before execution begins.",
          "**Runtime Errors (Exceptions):** Errors that occur during the execution of the program (e.g., trying to divide by zero, accessing a non-existent file). If not handled, they cause the program to crash.",
          "**Common Exception Types:** `TypeError`, `ValueError`, `IndexError`, `KeyError`, `FileNotFoundError`, `ZeroDivisionError`.",
          "**The `try...except` Block:** Used to handle exceptions gracefully.",
          "  `try:`\n      `# Code that might raise an exception`\n  `except ExceptionType as e:`\n      `# Code to run if ExceptionType (or its subclass) occurs`\n      `# 'e' is an optional variable holding the exception object`",
          "- You can have multiple `except` blocks to handle different types of exceptions specifically.",
          "- A generic `except Exception:` or just `except:` (catches all exceptions) should be used sparingly, as it can hide bugs. It's better to catch specific exceptions you anticipate.",
          "**The `else` Clause:** Optional. Code in the `else` block runs only if the `try` block completes without raising any exceptions.",
          "**The `finally` Clause:** Optional. Code in the `finally` block **always** runs, whether an exception occurred or not. Useful for cleanup operations (e.g., closing files, releasing resources).",
          "**Raising Exceptions (`raise` keyword):** You can intentionally raise an exception in your code using `raise ExceptionType(\"Error message\")`. This is useful for signaling errors in your own functions based on certain conditions."
        ],
        codeExamples: [
          { 
            id: 'ce-7-2-1', 
            title: 'Basic try-except Block', 
            code: "try:\n    numerator = 10\n    denominator = int(input(\"Enter a denominator: \"))\n    result = numerator / denominator\n    print(f\"Result: {result}\")\nexcept ZeroDivisionError:\n    print(\"Error: Cannot divide by zero!\")\nexcept ValueError:\n    print(\"Error: Please enter a valid integer for the denominator.\")\nexcept Exception as e: # Catch any other unexpected exceptions\n    print(f\"An unexpected error occurred: {e}\")", 
            explanation: "This code attempts a division. It specifically handles `ZeroDivisionError` and `ValueError`, and has a general `except` for other issues."
          },
          {
            id: 'ce-7-2-2',
            title: 'Using try-except-else-finally',
            code: "def divide_numbers(a, b):\n    try:\n        print(\"Attempting division...\")\n        result = a / b\n    except ZeroDivisionError:\n        print(\"Cannot divide by zero.\")\n        return None\n    except TypeError:\n        print(\"Inputs must be numbers.\")\n        return None\n    else:\n        print(\"Division successful!\")\n        return result\n    finally:\n        print(\"Division attempt finished.\") # This always runs\n\nprint(divide_numbers(10, 2))\nprint(\"--- Next call ---\")\nprint(divide_numbers(10, 0))\nprint(\"--- Next call ---\")\nprint(divide_numbers(10, \"a\"))",
            explanation: "`else` runs if no exception in `try`. `finally` always runs, regardless of exceptions."
          },
          {
            id: 'ce-7-2-3',
            title: 'Raising an Exception',
            code: "def process_age(age):\n    if age < 0:\n        raise ValueError(\"Age cannot be negative.\")\n    if age > 120:\n        raise ValueError(\"Age seems unusually high.\")\n    print(f\"Age {age} processed.\")\n\ntry:\n    process_age(25)\n    process_age(-5)\nexcept ValueError as e:\n    print(f\"Error: {e}\")",
            explanation: "The `process_age` function raises a `ValueError` if the age is invalid. The `try-except` block catches this."
          }
        ],
        quiz: [
          { id: 'q-7-2-1', questionText: "What is the primary purpose of a `try...except` block?", options: ["To speed up code execution", "To handle potential runtime errors gracefully", "To define new types of errors", "To ignore all errors"], correctOptionIndex: 1, explanation: "`try...except` allows your program to catch and manage exceptions (runtime errors) without crashing." },
          { id: 'q-7-2-2', questionText: "In a `try...except...else...finally` structure, when is the `finally` block executed?", options: ["Only if an exception occurs in the `try` block", "Only if no exception occurs in the `try` block", "Always, regardless of whether an exception occurred or not", "Only if an exception occurs and is caught by an `except` block"], correctOptionIndex: 2, explanation: "The `finally` block is always executed, making it suitable for cleanup tasks." },
          { id: 'q-7-2-3', questionText: "Which keyword is used to intentionally trigger an exception in Python?", options: ["`error`", "`throw`", "`exception`", "`raise`"], correctOptionIndex: 3, explanation: "The `raise` keyword is used to manually raise an exception." }
        ]
      }
    ]
  },
  // MODULE 8: Advanced Python Concepts (Phase 5 continued)
  {
    id: 'module-8',
    title: 'Advanced Python Concepts',
    description: 'Explore more sophisticated Python features for concise and efficient coding.',
    isPremium: true,
    topics: [
      {
        id: 'topic-8-1',
        title: 'Comprehensions',
        contentParagraphs: [
          "Comprehensions provide a concise and readable way to create lists, dictionaries, or sets from existing iterables.",
          "**List Comprehensions:** `[expression for item in iterable if condition]`\n  - Offers a shorter syntax for creating lists based on existing lists or other iterables.",
          "**Dictionary Comprehensions:** `{key_expression: value_expression for item in iterable if condition}`\n  - Similar to list comprehensions but used to create dictionaries.",
          "**Set Comprehensions:** `{expression for item in iterable if condition}`\n  - Used to create sets, automatically handling uniqueness.",
          "**Generator Expressions (briefly mentioned here, covered more with Generators):**\n  - Syntax is similar to list comprehensions but uses parentheses: `(expression for item in iterable if condition)`.\n  - They don't create the full list in memory at once. Instead, they create a generator object that yields items one by one, making them memory-efficient for large datasets."
        ],
        codeExamples: [
          { 
            id: 'ce-8-1-1', 
            title: 'List Comprehension', 
            code: "# Traditional way to create a list of squares\nsquares_trad = []\nfor x in range(10):\n    squares_trad.append(x**2)\nprint(f\"Traditional: {squares_trad}\")\n\n# Using list comprehension\nsquares_comp = [x**2 for x in range(10)]\nprint(f\"Comprehension: {squares_comp}\")\n\n# With a condition\neven_squares = [x**2 for x in range(10) if x % 2 == 0]\nprint(f\"Even Squares: {even_squares}\")",
            explanation: "List comprehensions offer a more compact and often more readable way to create lists."
          },
          {
            id: 'ce-8-1-2',
            title: 'Dictionary Comprehension',
            code: "numbers = [1, 2, 3, 4, 5]\n\n# Create a dictionary where keys are numbers and values are their squares\nsquared_dict = {num: num**2 for num in numbers}\nprint(f\"Squared Dict: {squared_dict}\")\n\n# With a condition\neven_squared_dict = {num: num**2 for num in numbers if num % 2 == 0}\nprint(f\"Even Squared Dict: {even_squared_dict}\")",
            explanation: "Dictionary comprehensions allow for concise creation of dictionaries from iterables."
          },
          {
            id: 'ce-8-1-3',
            title: 'Set Comprehension',
            code: "my_list = [1, 2, 2, 3, 4, 4, 4, 5]\n\n# Create a set of unique squared numbers from the list\nunique_squares_set = {x**2 for x in my_list}\nprint(f\"Unique Squares Set: {unique_squares_set}\")",
            explanation: "Set comprehensions create sets, automatically ensuring all elements are unique."
          }
        ],
        quiz: [
          { id: 'q-8-1-1', questionText: "What is a primary advantage of using list comprehensions?", options: ["They are the only way to create lists", "They offer a more concise syntax for creating lists from iterables", "They always run faster than traditional loops", "They can only be used with numbers"], correctOptionIndex: 1, explanation: "List comprehensions provide a more compact and often more Pythonic way to create lists based on existing sequences or iterables." },
          { id: 'q-8-1-2', questionText: "Which syntax is used for a dictionary comprehension?", options: ["`[key:value for item in iterable]`", "`{key:value for item in iterable}`", "` (key:value for item in iterable)`", "`set(key:value for item in iterable)`"], correctOptionIndex: 1, explanation: "Dictionary comprehensions use curly braces `{}` and a `key:value` pair expression." },
          { id: 'q-8-1-3', questionText: "If `numbers = [1, 2, 3]`, what is `[x*2 for x in numbers]`?", options: ["`[1, 2, 3]`", "`[2, 4, 6]`", "`[1, 4, 9]`", "It causes an error"], correctOptionIndex: 1, explanation: "The list comprehension iterates through `numbers`, and for each `x`, it calculates `x*2`, resulting in `[2, 4, 6]`." }
        ]
      },
      {
        id: 'topic-8-2',
        title: 'Generators and Iterators',
        contentParagraphs: [
          "**Iterators:** An iterator is an object that allows you to traverse through all the elements of a collection (like a list or string) one at a time. It implements two special methods:",
          "  - `__iter__()`: Returns the iterator object itself.",
          "  - `__next__()`: Returns the next item from the collection. If there are no more items, it raises a `StopIteration` exception.",
          "  You can get an iterator from any iterable (e.g., list, string, tuple) using the `iter()` built-in function.",
          "**Generators:** A simpler way to create iterators. Generators are functions that use the `yield` keyword instead of `return` to produce a sequence of values.",
          "  - When a generator function is called, it returns a generator object (which is a type of iterator).",
          "  - Each time `yield` is encountered, the function's state is paused, and the yielded value is returned. When `next()` is called again on the generator object, execution resumes from where it left off.",
          "**Advantages of Generators:**\n- **Memory Efficiency:** Generators produce items one at a time and only when requested. This is extremely useful for working with large datasets or infinite sequences, as they don't store all values in memory at once.",
          "- **Lazy Evaluation:** Values are generated on-the-fly.",
          "**Generator Expressions:** Similar to list comprehensions but use parentheses `()` instead of square brackets `[]`. They create a generator object.",
          "  `my_generator = (x**2 for x in range(10))`"
        ],
        codeExamples: [
          { 
            id: 'ce-8-2-1', 
            title: 'Simple Generator Function', 
            code: "def count_up_to(max_val):\n    count = 1\n    while count <= max_val:\n        yield count # Pauses here and returns 'count'\n        count += 1\n\n# Get a generator object\ncounter_gen = count_up_to(3)\n\nprint(next(counter_gen)) # Output: 1\nprint(next(counter_gen)) # Output: 2\nprint(next(counter_gen)) # Output: 3\n# print(next(counter_gen)) # Would raise StopIteration\n\n# Generators can be used in for loops directly\nfor num in count_up_to(2):\n    print(f\"From loop: {num}\")", 
            explanation: "The `count_up_to` function yields numbers one by one. The `for` loop automatically handles the `StopIteration`."
          },
          {
            id: 'ce-8-2-2',
            title: 'Generator Expression',
            code: "numbers = [1, 2, 3, 4, 5]\n\n# List comprehension (creates a full list in memory)\nlist_squares = [x*x for x in numbers]\nprint(f\"List comprehension: {list_squares}\")\n\n# Generator expression (creates a generator object)\ngen_squares = (x*x for x in numbers)\nprint(f\"Generator expression object: {gen_squares}\")\n\nprint(\"Values from generator:\")\nfor sq in gen_squares:\n    print(sq)\n# Note: you can only iterate through a generator once.",
            explanation: "Generator expressions provide a concise way to create generators, offering memory efficiency."
          }
        ],
        quiz: [
          { id: 'q-8-2-1', questionText: "What keyword is used in a generator function to produce a value and pause execution?", options: ["`return`", "`generate`", "`produce`", "`yield`"], correctOptionIndex: 3, explanation: "The `yield` keyword is used in generator functions to produce a value in a sequence." },
          { id: 'q-8-2-2', questionText: "What is a major advantage of using generators, especially with large datasets?", options: ["They are always faster than lists", "They are memory efficient as they produce items on demand", "They can be modified after creation", "They automatically sort data"], correctOptionIndex: 1, explanation: "Generators are memory efficient because they generate items one at a time, instead of storing the entire sequence in memory." },
          { id: 'q-8-2-3', questionText: "What happens when a `for` loop iterates over a generator and there are no more items to yield?", options: ["It raises a `ValueError`", "It enters an infinite loop", "It automatically handles the `StopIteration` and exits cleanly", "It returns `None` for each subsequent call"], correctOptionIndex: 2, explanation: "`for` loops are designed to work with iterators (including generators) and will automatically stop when `StopIteration` is raised internally." }
        ]
      },
      {
        id: 'topic-8-3',
        title: 'Decorators',
        contentParagraphs: [
          "**Decorators** are a powerful and expressive feature in Python that allow you to modify or enhance functions or methods in a clean and readable way. A decorator is essentially a function that takes another function as an argument (the decorated function), adds some functionality to it, and returns a new function (usually a modified version of the original).",
          "**Basic Structure:**\n1. Define a decorator function that takes a function as an argument.\n2. Inside the decorator, define a wrapper function. This wrapper will contain the original function's call and any additional logic.\n3. The decorator function returns the wrapper function.",
          "**Using Decorators (`@` syntax):** The `@decorator_name` syntax is placed directly above the function definition you want to decorate. This is syntactic sugar for `my_function = decorator_name(my_function)`.",
          "**Why use Decorators?**\n- **Code Reusability:** Apply common functionality (e.g., logging, timing, access control) to multiple functions without duplicating code.\n- **Readability:** Keeps the core logic of the decorated function clean, separating concerns.",
          "**`functools.wraps`:** When you write decorators, the decorated function often loses its original metadata (like its name `__name__` and docstring `__doc__`). `functools.wraps` is a decorator itself that you apply to your wrapper function to preserve this metadata from the original function."
        ],
        codeExamples: [
          { 
            id: 'ce-8-3-1', 
            title: 'Simple Decorator Example', 
            code: "import functools\n\ndef my_decorator(func):\n    @functools.wraps(func) # Preserves metadata of 'func'\n    def wrapper(*args, **kwargs):\n        print(\"Something is happening before the function is called.\")\n        result = func(*args, **kwargs) # Call the original function\n        print(\"Something is happening after the function is called.\")\n        return result\n    return wrapper\n\n@my_decorator\ndef say_hello(name):\n    \"\"\"Greets a person.\"\"\"\n    print(f\"Hello, {name}!\")\n    return f\"Greeting complete for {name}\"\n\nmessage = say_hello(\"PyMentor\")\nprint(f\"Function returned: {message}\")\nprint(f\"Original function name: {say_hello.__name__}\")\nprint(f\"Original docstring: {say_hello.__doc__}\")", 
            explanation: "`my_decorator` wraps `say_hello`, adding print statements before and after its execution. `@functools.wraps` ensures `say_hello` keeps its original name and docstring."
          },
          {
            id: 'ce-8-3-2',
            title: 'Decorator for Timing a Function',
            code: "import time\nimport functools\n\ndef timer_decorator(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start_time = time.time()\n        result = func(*args, **kwargs)\n        end_time = time.time()\n        print(f\"{func.__name__} executed in {end_time - start_time:.4f} seconds\")\n        return result\n    return wrapper\n\n@timer_decorator\ndef slow_function(delay):\n    \"\"\"A function that simulates some work by sleeping.\"\"\"\n    time.sleep(delay)\n    print(\"Slow function finished.\")\n\nslow_function(1) # This will print the execution time",
            explanation: "The `timer_decorator` measures and prints how long the `slow_function` takes to run."
          }
        ],
        quiz: [
          { id: 'q-8-3-1', questionText: "What is the primary purpose of a decorator in Python?", options: ["To delete functions", "To add new syntax to Python", "To modify or enhance functions or methods in a reusable way", "To define classes"], correctOptionIndex: 2, explanation: "Decorators provide a way to wrap additional functionality around an existing function or method." },
          { id: 'q-8-3-2', questionText: "What is the `@` symbol used for in the context of decorators?", options: ["To comment out a line", "To indicate a private function", "As syntactic sugar to apply a decorator to a function", "To start a multi-line string"], correctOptionIndex: 2, explanation: "The `@decorator_name` syntax is a clean way to apply a decorator to the function defined immediately below it." },
          { id: 'q-8-3-3', questionText: "What is the role of `functools.wraps` when writing decorators?", options: ["It makes the decorator run faster", "It encrypts the decorated function", "It helps preserve the original function's metadata (like name and docstring)", "It automatically adds logging to the function"], correctOptionIndex: 2, explanation: "`functools.wraps` copies metadata from the original function to the wrapper function, making the decorated function behave more like the original for introspection purposes." }
        ]
      }
    ]
  },
  // MODULE 9: Practical Python (Phase 6)
  {
    id: 'module-9',
    title: 'Practical Python',
    description: 'Apply your Python skills to common real-world tasks and learn about the broader ecosystem.',
    isPremium: true,
    topics: [
      {
        id: 'topic-9-1',
        title: 'Working with APIs (requests)',
        contentParagraphs: [
          "**What is an API?** An Application Programming Interface (API) is a set of rules and protocols that allows different software applications to communicate with each other. Web APIs allow you to interact with web services over the internet, typically using HTTP.",
          "**HTTP Requests:** Common methods include:\n- `GET`: Retrieve data from a server.\n- `POST`: Send data to a server to create a new resource.\n- `PUT`: Update an existing resource on a server.\n- `DELETE`: Remove a resource from a server.",
          "**The `requests` Library:** A popular third-party Python library that makes sending HTTP requests very simple. You'll likely need to install it: `pip install requests`.",
          "**Making a GET Request:** `response = requests.get('url')`",
          "**Response Object:** The `requests.get()` (and other methods) returns a `Response` object containing server's response.",
          "  - `response.status_code`: HTTP status code (e.g., 200 for OK, 404 for Not Found).",
          "  - `response.text`: Response content as a string (usually for HTML or text).",
          "  - `response.json()`: If the response is JSON, this conveniently parses it into a Python dictionary or list.",
          "  - `response.headers`: Dictionary of response headers.",
          "**Passing Parameters in GET Requests:** Can be done by adding them to the URL (e.g., `?key1=value1&key2=value2`) or using the `params` argument: `requests.get('url', params={'key1': 'value1'})`.",
          "**Making POST Requests:** Often used to send data (e.g., from a form) to a server. Data can be sent using the `data` (for form data) or `json` (for JSON payload) argument: `requests.post('url', data={'key': 'value'})` or `requests.post('url', json={'key': 'value'})`."
        ],
        codeExamples: [
          { 
            id: 'ce-9-1-1', 
            title: 'Simple GET Request using `requests`', 
            code: "import requests\n\n# Example API (JSONPlaceholder - fake online REST API for testing)\napi_url = \"https://jsonplaceholder.typicode.com/todos/1\"\n\ntry:\n    response = requests.get(api_url)\n    response.raise_for_status() # Raises an HTTPError for bad responses (4XX or 5XX)\n\n    print(f\"Status Code: {response.status_code}\")\n    # The response content is often JSON\n    todo_item = response.json() # Parses JSON into a Python dictionary\n    print(\"Todo Item:\")\n    print(f\"  User ID: {todo_item['userId']}\")\n    print(f\"  Title: {todo_item['title']}\")\n    print(f\"  Completed: {todo_item['completed']}\")\n\nexcept requests.exceptions.HTTPError as http_err:\n    print(f\"HTTP error occurred: {http_err}\")\nexcept requests.exceptions.RequestException as err:\n    print(f\"Other error occurred: {err}\")", 
            explanation: "This example fetches a single 'todo' item from a public test API and prints its details. It also includes basic error handling for the request."
          },
          {
            id: 'ce-9-1-2',
            title: 'GET Request with Parameters',
            code: "import requests\n\napi_url = \"https://jsonplaceholder.typicode.com/comments\"\n# Get comments for a specific postId\nparams = {\n    'postId': 1\n}\n\ntry:\n    response = requests.get(api_url, params=params)\n    response.raise_for_status()\n    comments = response.json()\n    print(f\"Found {len(comments)} comments for postId {params['postId']}:\")\n    for comment in comments[:2]: # Print first two comments\n        print(f\"  - Name: {comment['name']}, Email: {comment['email']}\")\n\nexcept requests.exceptions.RequestException as e:\n    print(f\"Error: {e}\")",
            explanation: "Demonstrates fetching data from an API using URL parameters to filter results (getting comments for a specific post)."
          }
        ],
        quiz: [
          { id: 'q-9-1-1', questionText: "Which HTTP method is typically used to retrieve data from a server API?", options: ["POST", "PUT", "GET", "DELETE"], correctOptionIndex: 2, explanation: "The GET method is used to request data from a specified resource on a server." },
          { id: 'q-9-1-2', questionText: "What does the `response.json()` method from the `requests` library typically do?", options: ["Converts a Python dictionary to a JSON string", "Parses a JSON response from the server into a Python dictionary or list", "Validates if the response is in XML format", "Returns the raw text of the response"], correctOptionIndex: 1, explanation: "`response.json()` deserializes a JSON formatted response content into a Python data structure." },
          { id: 'q-9-1-3', questionText: "What is a common HTTP status code indicating a successful request?", options: ["404", "500", "200", "301"], correctOptionIndex: 2, explanation: "A status code of 200 (OK) generally means the request was successful." }
        ]
      },
      {
        id: 'topic-9-2',
        title: 'Regular Expressions (re module)',
        contentParagraphs: [
          "**Regular Expressions (Regex)** are sequences of characters that define a search pattern. They are extremely powerful for string matching and manipulation.",
          "Python's `re` module provides support for regular expressions.",
          "**Basic Metacharacters:**\n- `.` : Matches any single character (except newline).\n- `^` : Matches the start of the string.\n- `$` : Matches the end of thestring.\n- `*` : Matches 0 or more repetitions of the preceding character/group.\n- `+` : Matches 1 or more repetitions of the preceding character/group.\n- `?` : Matches 0 or 1 repetition of the preceding character/group.\n- `\\d` : Matches any digit (0-9).\n- `\\D` : Matches any non-digit.\n- `\\w` : Matches any alphanumeric character (letters, numbers, underscore).\n- `\\W` : Matches any non-alphanumeric character.\n- `\\s` : Matches any whitespace character (space, tab, newline).\n- `\\S` : Matches any non-whitespace character.\n- `[]` : Character set. Matches any one character within the brackets (e.g., `[aeiou]` matches any vowel).\n- `()` : Grouping. Captures the matched substring.",
          "**Common `re` Module Functions:**\n- `re.search(pattern, string)`: Scans the string for the first location where the pattern produces a match, and returns a match object if found, else `None`.\n- `re.match(pattern, string)`: Tries to apply the pattern at the start of the string. Returns a match object if found, else `None`.\n- `re.findall(pattern, string)`: Returns a list of all non-overlapping matches of the pattern in the string.\n- `re.sub(pattern, replacement, string)`: Replaces occurrences of the pattern in the string with the replacement. Returns the modified string.\n- `re.compile(pattern)`: Compiles a regular expression pattern into a regex object, which can be used for more efficient matching if you use the same pattern multiple times.",
          "Regular expressions can be complex, but they are invaluable for tasks like data validation (e.g., checking email formats), web scraping, and text processing."
        ],
        codeExamples: [
          { 
            id: 'ce-9-2-1', 
            title: 'Using `re.search()` and `re.findall()`', 
            code: "import re\n\ntext = \"The rain in Spain falls mainly on the plain. Phone: 123-456-7890\"\n\n# Search for 'Spain'\nmatch = re.search(r\"Spain\", text) # r\"...\" denotes a raw string, good for regex\nif match:\n    print(f\"Found '{match.group(0)}' at index {match.start()}-{match.end()}\")\nelse:\n    print(\"Pattern not found.\")\n\n# Find all occurrences of words starting with 'p' followed by 'ain'\nmatches = re.findall(r\"p[a-z]*ain\", text, re.IGNORECASE) # re.IGNORECASE for case-insensitive\nprint(f\"Words matching 'p...ain': {matches}\")\n\n# Find a phone number pattern\nphone_match = re.search(r\"\\d{3}-\\d{3}-\\d{4}\", text)\nif phone_match:\n    print(f\"Phone number found: {phone_match.group(0)}\")", 
            explanation: "`re.search()` finds the first match. `re.findall()` finds all non-overlapping matches. `match.group(0)` returns the matched substring."
          },
          {
            id: 'ce-9-2-2',
            title: 'Using `re.sub()` for Replacement',
            code: "import re\n\ntext = \"Agent Alice gave the documents to Agent Bob.\"\n\n# Replace 'Agent' with 'Operative'\nnew_text = re.sub(r\"Agent\\s+(\\w+)\", r\"Operative \\1\", text)\n# \\s+ matches one or more spaces. (\\w+) captures the agent's name into group 1.\n# \\1 in the replacement string refers to what was captured by the first group.\nprint(f\"Original: {text}\")\nprint(f\"Modified: {new_text}\")\n\n# Remove all digits\ntext_with_digits = \"Order_ID: 12345, Item: ABC678\"\nno_digits_text = re.sub(r\"\\d\", \"\", text_with_digits)\nprint(f\"Text without digits: {no_digits_text}\")",
            explanation: "`re.sub()` replaces matched patterns. Capturing groups `()` can be used in the replacement string using `\\1`, `\\2`, etc."
          }
        ],
        quiz: [
          { id: 'q-9-2-1', questionText: "In regular expressions, what does `\\d` typically match?", options: ["Any letter", "Any whitespace character", "Any digit", "The start of a line"], correctOptionIndex: 2, explanation: "`\\d` is a metacharacter that matches any decimal digit (0-9)." },
          { id: 'q-9-2-2', questionText: "Which `re` module function returns a list of all non-overlapping matches of a pattern in a string?", options: ["`re.search()`", "`re.match()`", "`re.sub()`", "`re.findall()`"], correctOptionIndex: 3, explanation: "`re.findall()` finds all occurrences of the pattern and returns them as a list of strings." },
          { id: 'q-9-2-3', questionText: "What is the purpose of using raw strings (e.g., `r\"pattern\"`) with regular expressions in Python?", options: ["To make the pattern case-insensitive", "To prevent backslashes from being interpreted as escape sequences", "To compile the pattern for better performance", "To search for patterns in binary files"], correctOptionIndex: 1, explanation: "Raw strings treat backslashes as literal characters, which is important because regular expressions also use backslashes for special sequences. This avoids conflicts with Python's string escape sequences." }
        ]
      },
      {
        id: 'topic-9-3',
        title: 'Virtual Environments & Testing Basics',
        contentParagraphs: [
          "**Virtual Environments:** A self-contained directory tree that includes a Python installation for a particular version of Python, plus a number of additional packages.",
          "**Why use them?**\n- **Dependency Management:** Different projects may require different versions of the same library. Virtual environments allow you to manage these dependencies on a per-project basis, avoiding conflicts.\n- **Project Isolation:** Keeps your global Python installation clean and organized.",
          "**Using `venv` (built-in):**\n1.  Create a virtual environment: `python -m venv myenvname` (in your project directory). This creates a `myenvname` folder.\n2.  Activate it:\n    - Windows: `myenvname\\Scripts\\activate`\n    - macOS/Linux: `source myenvname/bin/activate`\n    (Your terminal prompt usually changes to indicate the active environment).\n3.  Install packages: `pip install package_name` (they will be installed only in this environment).\n4.  Deactivate: Simply type `deactivate`.",
          "**`requirements.txt`:** A file listing project dependencies. Create with `pip freeze > requirements.txt`. Install with `pip install -r requirements.txt`.",
          "**Introduction to Testing:** Writing code to test your main application code to ensure it works as expected.",
          "**Why test?** Catch bugs early, facilitate refactoring, provide documentation.",
          "**`unittest` (built-in):** Python's standard library testing framework (xUnit style).\n  - Create test classes inheriting from `unittest.TestCase`.\n  - Write test methods starting with `test_`.\n  - Use assertion methods like `assertEqual()`, `assertTrue()`, `assertRaises()`.",
          "**`pytest` (popular third-party):** Often preferred for its simpler syntax and powerful features (install with `pip install pytest`).\n  - Write test functions (often in files named `test_*.py` or `*_test.py`).\n  - Use plain `assert` statements."
        ],
        codeExamples: [
          { 
            id: 'ce-9-3-1', 
            title: 'Basic `unittest` Example (save as `test_calc.py`)', 
            code: "# Assume you have a file `calculator.py` with:\n# def add(x, y):\n#     return x + y\n\nimport unittest\n# from calculator import add # If calculator.py is in the same directory or Python path\n\n# For demonstration, let's define add here if calculator.py doesn't exist\ndef add(x, y):\n    if not (isinstance(x, (int, float)) and isinstance(y, (int, float))):\n        raise TypeError(\"Inputs must be numbers\")\n    return x + y\n\nclass TestCalculator(unittest.TestCase):\n    def test_add_integers(self):\n        self.assertEqual(add(2, 3), 5, \"Should be 5\")\n\n    def test_add_floats(self):\n        self.assertAlmostEqual(add(1.0, 2.5), 3.5, places=7, msg=\"Should be 3.5\")\n\n    def test_add_negative_numbers(self):\n        self.assertEqual(add(-1, -1), -2, \"Should be -2\")\n\n    def test_add_type_error(self):\n        with self.assertRaises(TypeError):\n            add(\"hello\", 2) # Should raise TypeError\n\nif __name__ == '__main__':\n    unittest.main() # Runs the tests\n# To run from terminal: python -m unittest test_calc.py", 
            explanation: "A simple `unittest` test case for an `add` function. Each method starting with `test_` is a separate test. Assertions check if conditions are met."
          },
          {
            id: 'ce-9-3-2',
            title: 'Basic `pytest` Example (save as `test_example_pytest.py`)',
            code: "# Assume you have a function to test, e.g., in a file `my_functions.py`:\n# def multiply(a, b):\n# return a * b\n\n# For demonstration, define it here:\ndef multiply(a, b):\n    return a * b\n\n# Test functions for pytest start with 'test_'\ndef test_multiply_positive():\n    assert multiply(2, 3) == 6\n\ndef test_multiply_by_zero():\n    assert multiply(5, 0) == 0\n\ndef test_multiply_negative():\n    assert multiply(-2, 3) == -6\n\n# To run pytest, navigate to the directory in terminal and type: pytest",
            explanation: "`pytest` allows for simpler test functions using standard `assert` statements. Pytest will automatically discover and run functions named `test_*`."
          }
        ],
        quiz: [
          { id: 'q-9-3-1', questionText: "What is the primary purpose of a Python virtual environment?", options: ["To make Python run faster", "To isolate project dependencies and avoid conflicts", "To automatically write tests for your code", "To share code online"], correctOptionIndex: 1, explanation: "Virtual environments create isolated setups for each project, allowing them to have their own set of package versions without interfering with other projects or the global Python installation." },
          { id: 'q-9-3-2', questionText: "Which command is used to create a virtual environment using `venv`?", options: ["`python -m venv create myenv`", "`venv new myenv`", "`python -m venv myenv`", "`pip venv myenv`"], correctOptionIndex: 2, explanation: "The command `python -m venv <environment_name>` creates a new virtual environment." },
          { id: 'q-9-3-3', questionText: "In `unittest`, methods that are actual test cases typically start with what prefix?", options: ["`assert_`", "`run_`", "`test_`", "`check_`"], correctOptionIndex: 2, explanation: "Test methods in classes derived from `unittest.TestCase` must start with `test_` to be discovered and run by the test runner." }
        ]
      },
      {
        id: 'topic-9-4',
        title: 'Version Control with Git (Basics)',
        contentParagraphs: [
          "**Version Control Systems (VCS)** like Git are tools that help track changes to files over time. They allow you to revert to previous versions, collaborate with others, and manage different versions (branches) of your project.",
          "**Git** is a distributed version control system. This means you have a full copy of the project's history locally.",
          "**GitHub, GitLab, Bitbucket:** Online platforms that host Git repositories, facilitating collaboration, backups, and project management.",
          "**Basic Git Workflow:**",
          "1.  **Initialize a Repository:** `git init` (run in your project's root directory to start tracking it with Git). This creates a hidden `.git` folder.",
          "2.  **Staging Files:** `git add <filename>` or `git add .` (to stage all changes). Staging means selecting which changes you want to include in your next commit (snapshot).",
          "3.  **Committing Changes:** `git commit -m \"Your descriptive commit message\"`. A commit is a snapshot of your project at a specific point in time. The message should briefly explain what changes were made.",
          "4.  **Checking Status:** `git status` (shows which files are modified, staged, or untracked).",
          "5.  **Viewing History:** `git log` (shows a history of commits).",
          "**Branching and Merging (Core Concepts):**",
          "- **Branches:** Allow you to work on different features or fixes in isolation without affecting the main codebase (often the `main` or `master` branch).",
          "  - `git branch <branch_name>`: Create a new branch.",
          "  - `git checkout <branch_name>` or `git switch <branch_name>`: Switch to a different branch.",
          "- **Merging:** `git merge <branch_name>` (run while on the target branch, e.g., `main`). Combines changes from one branch into another.",
          "**Remote Repositories (e.g., on GitHub):**",
          "- `git clone <repository_url>`: Download a repository from a remote server to your local machine.",
          "- `git remote add origin <repository_url>`: Connect your local repository to a remote one (often named `origin`).",
          "- `git push origin <branch_name>`: Upload your local commits from a branch to the remote repository.",
          "- `git pull origin <branch_name>`: Download changes from the remote repository and merge them into your local branch.",
          "Learning Git is a skill in itself, but essential for most software development."
        ],
        codeExamples: [
          { 
            id: 'ce-9-4-1', 
            title: 'Common Git Commands (Conceptual - Run in Terminal)', 
            code: "# 1. Navigate to your project directory in the terminal\n# cd /path/to/your/project\n\n# 2. Initialize a new Git repository\n# git init\n\n# 3. Create a file (e.g., main.py) and add some code\n\n# 4. Stage the file for commit\n# git add main.py\n# Or stage all changes: git add .\n\n# 5. Commit the changes\n# git commit -m \"Initial commit with main.py\"\n\n# 6. Check the status\n# git status\n\n# 7. Create a new branch for a feature\n# git branch new-feature\n# git checkout new-feature\n\n# 8. Make changes on the new-feature branch, then add and commit them\n# git add .\n# git commit -m \"Implemented new feature\"\n\n# 9. Switch back to the main branch and merge the feature\n# git checkout main\n# git merge new-feature\n\n# (Assuming you've set up a remote repository on GitHub called 'origin')\n# 10. Push changes to GitHub\n# git push origin main", 
            explanation: "This shows a typical sequence of Git commands used in a project. These are executed in your computer's terminal, not as Python code."
          }
        ],
        quiz: [
          { id: 'q-9-4-1', questionText: "What is the primary purpose of Git?", options: ["To write Python code faster", "To track changes to files over time and collaborate on projects", "To host websites", "To install Python packages"], correctOptionIndex: 1, explanation: "Git is a version control system designed to help manage project history, track changes, and facilitate teamwork." },
          { id: 'q-9-4-2', questionText: "Which Git command is used to save your staged changes to the local repository history?", options: ["`git add`", "`git push`", "`git status`", "`git commit`"], correctOptionIndex: 3, explanation: "`git commit` records a snapshot of the currently staged changes to the project's history." },
          { id: 'q-9-4-3', questionText: "What is the common name for the default remote repository in Git when working with platforms like GitHub?", options: ["`source`", "`upstream`", "`origin`", "`master`"], correctOptionIndex: 2, explanation: "`origin` is the conventional default name for the remote repository from which a project was cloned or to which it pushes." }
        ]
      }
    ]
  },
  // MODULE 10: Final Project (Phase "Z")
  {
    id: 'module-10',
    title: 'Final Project: CLI Library Manager',
    description: 'Apply everything you\'ve learned to build a command-line application.',
    isPremium: true, // Final project as premium content
    topics: [
      {
        id: 'topic-10-1',
        title: 'Project Overview and Requirements',
        contentParagraphs: [
          "**Project Goal:** Create a Command-Line Interface (CLI) application to manage a personal collection of books.",
          "This project will allow you to practice many of the Python concepts you've learned, including functions, data structures, object-oriented programming (optional but recommended), file I/O, and user interaction.",
          "**Core Features to Implement:**",
          "1.  **Add a Book:**\n    - Prompt the user for book details: title, author, publication year.\n    - Optionally, prompt for ISBN and a read status (e.g., 'read', 'unread', 'reading').\n    - Store this information.",
          "2.  **List All Books:**\n    - Display all books currently in the library.\n    - Format the output clearly, showing all relevant details for each book.",
          "3.  **Search for a Book:**\n    - Allow users to search for books by title or author.\n    - Display any books that match the search query.",
          "4.  **Update Book Status:**\n    - Allow users to mark a book as 'read', 'unread', or 'reading'.\n    - The user should be able to identify the book to update (e.g., by title or a unique ID).",
          "5.  **Remove a Book:**\n    - Allow users to remove a book from the library.\n    - The user should be able to identify the book to remove.",
          "6.  **Data Persistence:**\n    - Save the library data to a file (e.g., JSON or CSV format) when the program exits.\n    - Load the library data from the file when the program starts, so the collection is not lost between sessions."
        ],
        codeExamples: [], // No code examples for project overview
        quiz: [
            { id: 'q-10-1-1', questionText: "What is the primary goal of the CLI Library Manager project?", options: ["To build a web application", "To create a command-line tool for managing a book collection", "To analyze book sales data", "To integrate with an online bookstore API"], correctOptionIndex: 1, explanation: "The project focuses on creating a CLI application for personal book management." },
            { id: 'q-10-1-2', questionText: "Which of the following is a core required feature for the project?", options: ["Graphical user interface", "User authentication", "Data persistence (saving/loading books)", "Integration with social media"], correctOptionIndex: 2, explanation: "Saving and loading the book collection data (data persistence) is a crucial requirement." }
        ]
      },
      {
        id: 'topic-10-2',
        title: 'Design and Implementation Strategy',
        contentParagraphs: [
          "**1. Data Structure for Books:**",
          "   - **Option A (List of Dictionaries):** Each book is a dictionary. E.g., `{'title': '...', 'author': '...', 'year': ...}`.",
          "   - **Option B (OOP - Recommended):** Create a `Book` class with attributes like `title`, `author`, `year`, `status`, etc. This makes the code more organized and allows for methods related to books.",
          "**2. Library Management:**",
          "   - You'll need a way to store the collection of books (e.g., a list of `Book` objects or a list of dictionaries).",
          "   - If using OOP, consider creating a `Library` class to manage the collection and handle operations like adding, searching, and file I/O.",
          "**3. User Interface (CLI):**",
          "   - Create a main loop that presents a menu of options to the user (e.g., Add, List, Search, Exit).",
          "   - Use `input()` to get user choices and book details.",
          "   - Use `print()` to display information and results.",
          "**4. Functions for Each Feature:**",
          "   - Break down each core feature into one or more functions. For example:",
          "     - `add_book()`",
          "     - `list_books()`",
          "     - `search_books()`",
          "     - `update_status()`",
          "     - `remove_book()`",
          "     - `save_library_to_file()`",
          "     - `load_library_from_file()`",
          "**5. File Handling:**",
          "   - Choose a file format: JSON is often a good choice for structured data like this because it's human-readable and easy to parse with Python's `json` module.",
          "   - Implement functions to save the current state of the library to the chosen file and to load it when the application starts.",
          "**6. Error Handling:**",
          "   - Use `try-except` blocks for operations that might fail, such as file I/O or invalid user input (e.g., trying to convert non-numeric input to an integer for the year).",
          "**Step-by-Step Implementation Approach:**",
          "   a. Start with the `Book` class definition (if using OOP) or decide on the dictionary structure.",
          "   b. Implement the `add_book` functionality and a way to store the books (in-memory list for now).",
          "   c. Implement `list_books` to see your added books.",
          "   d. Implement file saving and loading next, so you don't lose data.",
          "   e. Gradually add other features: search, update, remove.",
          "   f. Build the main menu and user interaction loop.",
          "   g. Add error handling and refine the user experience.",
          "**Modularity:** Keep your code organized. If it gets long, consider splitting it into multiple files (modules)."
        ],
        codeExamples: [], // No specific code examples for design strategy
        quiz: [
            { id: 'q-10-2-1', questionText: "When designing the data structure for books, what is a recommended approach for better organization and encapsulation?", options: ["Using global variables for each book detail", "Storing all data in a single text file string", "Creating a `Book` class using Object-Oriented Programming", "Using only lists of numbers"], correctOptionIndex: 2, explanation: "Using a `Book` class (OOP) helps encapsulate book data and related behaviors, leading to more organized code." },
            { id: 'q-10-2-2', questionText: "Which Python module is well-suited for saving and loading the library data if you choose JSON format?", options: ["`csv`", "`os`", "`pickle`", "`json`"], correctOptionIndex: 3, explanation: "The `json` module is designed for working with JSON data, making it easy to save and load Python dictionaries/lists." }
        ]
      },
      {
        id: 'topic-10-3',
        title: 'Potential Enhancements (Optional)',
        contentParagraphs: [
          "Once you have the core features working, you can consider these enhancements to further practice your skills:",
          "- **Edit Book Details:** Allow users to modify existing information for a book (e.g., correct a typo in the title or update the author).",
          "- **Sort Books:** Add functionality to display books sorted by title, author, or publication year.",
          "- **More Sophisticated Search:**\n  - Case-insensitive search.\n  - Partial matches (e.g., searching for 'pyth' finds 'Python').",
          "- **Assign Unique IDs:** Automatically assign a unique ID to each book when it's added. This can make it easier and more reliable to select books for updating or removing, especially if titles are similar.",
          "- **Basic Statistics:** Display simple statistics, such as the total number of books in the library, number of read books, number of unread books.",
          "- **Input Validation:** More robust validation for user inputs (e.g., ensure the publication year is a valid number, check ISBN format if you implement it).",
          "- **Pagination for Listing:** If the library becomes very large, implement a way to show books in pages rather than all at once.",
          "- **Filtering:** Allow users to filter books by read status or other criteria.",
          "- **Using a Simple Database (Advanced):** For a more advanced version, consider using a lightweight database like SQLite instead of a plain JSON/CSV file for data persistence. This introduces database concepts.",
          "Remember to test your application thoroughly as you add new features!"
        ],
        codeExamples: [], // No code examples for enhancements list
        quiz: [
            { id: 'q-10-3-1', questionText: "Which of these would be a useful enhancement for identifying specific books if titles might be similar?", options: ["Making all titles uppercase", "Assigning a unique ID to each book", "Only allowing one book per author", "Storing books in reverse chronological order"], correctOptionIndex: 1, explanation: "Unique IDs provide a reliable way to reference specific books, especially for update or delete operations." },
            { id: 'q-10-3-2', questionText: "For a more advanced version of data persistence beyond simple files, what could be considered?", options: ["Storing data in Python lists only", "Using a lightweight database like SQLite", "Encrypting all book titles", "Writing custom binary file formats"], correctOptionIndex: 1, explanation: "Using a database like SQLite offers more robust data management capabilities than plain text or JSON files for larger collections or more complex queries." }
        ]
      }
    ]
  }
];

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
export const AI_ASSISTANT_INITIAL_MESSAGE = "Hello! I'm PyMentor AI. How can I help you with Python today? You can ask me to explain a concept, clarify code, or even give you a coding challenge.";

export const PYTHON_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M12.528 3.472S9.472 3.472 9.472 6.528v2.944H6.528S3.472 9.472 3.472 12.528s3.056 3.056 3.056 3.056h2.944v2.944s0 3.056 3.056 3.056 3.056-3.056 3.056-3.056v-2.944h2.944s3.056 0 3.056-3.056-3.056-3.056-3.056-3.056h-2.944V6.528S15.584 3.472 12.528 3.472zm-1.528.764c1.228 0 2.292 1.064 2.292 2.292s-1.064 2.292-2.292 2.292-2.292-1.064-2.292-2.292S9.772 4.236 11 4.236zm0 12.764c-1.228 0-2.292-1.064-2.292-2.292s1.064-2.292 2.292 2.292 2.292 1.064 2.292 2.292-1.064 2.292-2.292 2.292z"/>
</svg>
`;