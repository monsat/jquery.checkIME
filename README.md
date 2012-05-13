jquery.checkIME
===============

check IME mode if pushed enter key

## Installation

### Download this plugin

```sh
git clone git://github.com/monsat/jquery.checkIME.git js/jquery/jquery.checkIME
```

## USAGE

### load JS

```html
<head>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script src="/js/jquery/jquery.checkIME/jquery.checkIME.js"></script>
</head>
```

### Use it

```html
<body>
  <input type="text" id="foo">
  <script>
    $('#foo').checkIME()
      .bind('checkIME.confirmed', function(e, data){
        console.log('confirmed the conversion.');
      });
  </script>
</body>
```

Or you can bind automaticaly.
  with  data-provide="checkIME" attribute.

```html
<body>
  <input type="text" id="bar" data-provide="checkIME">
  <script>
    $('#bar').bind('checkIME.confirmed', function(e, data){
        console.log('confirmed the conversion.');
      });
  </script>
</body>
```

# License

The MIT License (MIT)
