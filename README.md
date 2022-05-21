`head [-n count | -c bytes] [file ...]`

```
  head file
    The head utility displays the first count lines or bytes of each of the specified files.

  head -n count files
    This filter displays the first count lines of specified files.
    The default count is 10.
  
  head -c bytes files
    This filter displays the first bytes of specified files.

  head [file ...]
    If more than one file specified, each file is preceded by a header consisting of the string '==>XXX<==' where 'XXX' is the name of the file.
    
```
