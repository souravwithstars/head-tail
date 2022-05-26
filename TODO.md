## Tail : - 

* __TODO:__

  - [ ] Provide default for options of `tail`.
  - [ ] Keep `usage` for without options.

* __MAYBE:__

* __DONE:__

  - [x] Establish contract for `tail` utility.
  - [x] Make `testTail.js`.
  - [x] Start with an expectation.
  - [x] Make `tail` work for a single line instead of file.
  - [x] Make `tail` work for multiple lines and empty line.
  - [x] Implement option as a parameter to `tail`.
  - [x] Investigate how `tail` works with options.
  - [x] Implement `tail` with lines(-n) option.
  - [x] Implement `tail` with bytes(-c) option.
  - [x] Extract different functions for lines and bytes. 
  - [x] Introduce `tail.js`, that runs from command line.
  - [x] Implement `tail file` without options.

---

## Head : -

* __TODO:__

* __MAYBE:__

* __DONE:__

    - [x] Establish contract for `head` utility.
    - [x] Make correct directory structure.
    - [x] Verify `mocha` exists.
    - [x] Make `testHead.js`.
    - [x] Start with an expectation.
    - [x] Make `head` work for a single line instead of file.
    - [x] Create `headLib` in src and keep `head.js` in root of working   project.
    - [x] Make `head` work for two lines. 
    - [x] Make `head` work for empty line.  
    - [x] Investigate how options work for `head`.  
    - [x] Implement options as a parameter to `head`. 
    - [x] Implement a different contract for functions in Lib.  
    - [x] Implement different function for split and join lines.  
    - [x] Extracted `\n` to a constant. 
    - [x] Implement options as an object. 
    - [x] Implement `head` with count (-n) option.  
    - [x] Separate test files for line utilities. 
    - [x] Introduce `head.js`, that runs from command line.   
    - [x] Implement `head file` without options.  
    - [x] Implement function for `.slice()`.  
    - [x] Implement --help if no argument passed to `head.js`.  
    - [x] Implement `head` with bytes (-c) option.  
    - [x] Extract separator and option selection in different function. 
    - [x] Implement `-n` as an command line argument. 
    - [x] Change the contract of Main.  
    - [x] Provide default for options of `head`.  
    - [x] Parse arguments passed to main. 
    - [x] Implement `-c` as an command line argument. 
    - [x] Add try catch block for readfile. 
    - [x] Report error when unable to read file.  
    - [x] Consider different structure for functions. 
    - [x] Report error when both switches provided. 
    - [x] Changed option name from count to lines.  
    - [x] Provide a default of 10 for -n option.  
    - [x] Make `head` for repeating same option.  
    - [x] Refactoring parsing arguments for both `-n 5` and `-n5`.  
    - [x] Change the contract of selector for given object. 
    - [x] Make `head` work for multiple files.  
    - [x] Test intermediate functions.  
    - [x] Implement function for output structure.  
    - [x] Report usage for invalid option and without file name.
    - [x] Report error for invalid values to option.
    - [x] Create Validation functions for options ans values.
    - [x] Create exit code for errors.