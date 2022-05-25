`head [-n lines | -c bytes] [file ...]`

```
  head file
    The head utility displays the first count lines or bytes of each of the specified files.

  head -n lines files
    This filter displays the first count lines of specified files.
    The default count is 10.
  
  head -c bytes files
    This filter displays the first count bytes of specified files.

  head [file ...]
    If more than one file specified, each file is preceded by a header consisting of the string '==> XXX <==' where 'XXX' is the name of the file.
    
```

`tail [-r] [-q] [-n lines | -c bytes] [file ...]`

```
  tail file
    The tail utility displays the last count lines or bytes of each of the specified files.

  tail -n lines files
    This filter display the last count lines of specified files.
    The default count '-n 10', or the last 10 lines.

  tail -c bytes files
    This filter displays the last count bytes of specified files.

  tail [file ...]
    If more than one file specified, each file is preceded by a header consisting of the string '==> XXX <==' where 'XXX' is the name of the file.

  tail -q [file ...]
    Suppresses printing of headers when multiple files are being examined.

  tail -r  [file ...]
    This filter cuase the input to be displayed in reverse order, by line. 
    The default of the -r option is to display all of the input.

```
