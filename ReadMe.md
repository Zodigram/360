# CSCI 360 Project: A Software Emulator for Computer Architecture (memory hierarchy) and Arithmetic Logic Unit (ALU).

## Project Description
### Test Program Setup
Ask user to continuously input random integers until the number of entered reaches 10. Each time the user enters a new integer, the current maximum and minimum integers in the saved list are output to the screen. You can simply assume that all integers are non-negative. You can also assume that all integers are small values and can be represented by 1 byte .
- Write a program to solve the above problem in high level source code such as C and C++.
- You have to utilize the function calls instead of using a single verbose function to do all the works.
- Translate your program into assembly language. Compare your code with https://godbolt.org/.

### Component Setup
Currently, we refer the memory as the virtual memory. Physical memory and cache will be added in next step.
- Build a memory/stack address system and CPU registers. You can assume that each assembly instruction takes 4 bytes or 8 bytes. The registers can be accessed by different names upon the data size: only consider 32 and 64. You should consider the program counter/rip as well.
- Use a simplified input/output system. You can assume that the keyboard and screen are just a range of memory spaces.
- Create a GUI. The GUI should contains the source/assembly editor, the register table, the stack table, the function look-up table, the memory table (stack, bss, data and text).

### Extra Points (each gets 5% * project weight)
- Support and implement global or static variable.
- Support flexible execution mode: step by step, one-click run. See https://github.com/Schweigi/assembler-simulator.

## Group #2:
- Hunter Zhao
- Marlon Lopez
- Benjamin Pulatov

## Task List
- [x] Code test program and translate it into assembly language
- [x] Build a memory/stack address system and CPU registers
- [x] Create a GUI which contains the source/assembly editor, the register table, the stack table, the function look-up table, and the memory table (stack, bss, data and text).

