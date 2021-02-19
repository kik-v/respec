# Profiel voor specificaties KIK-V
Het profiel is gerealiseerd voor Respec (https://github.com/w3c/respec)

## Voor development
Zie [developer guide](https://github.com/w3c/respec/wiki/Developers-Guide) om Respec te installeren.
kopieer vervolgens profiles/kikv.js profiel en de src/kikv/* naar de mappen van respec. 

In de basic.html moet je aanpassen de volgende regel aanpassen

```html
<script src='../profiles/w3c.js' async class='remove'></script>
```

naar

```html
<script src='../profiles/kikv.js' async class='remove'></script>
```