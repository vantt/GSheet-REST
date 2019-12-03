## Javascript OOP ### SUMMARY **private variables** - are declared with the ***var*** keyword inside the object,        
 - and can ***only be accessed by private functions and privileged methods***.      
      
**public properties** - are declared with ***this.variableName*** and       
- may be read/written ***from outside*** the object.        
      
**private functions** - are declared inline inside the object's constructor ***function ABC ()*** - or alternatively may be defined via ***var functionName=function(){...})*** - and may ***only be called by privileged methods*** (including the object's constructor).        
      
**privileged methods** - are declared with ***this.methodName=function(){...}*** - may ***invoked by code external to the object***.        
      
**public methods** - are defined by ***Classname.prototype.methodName = function(){...}*** - and may be called from outside the object, but ***can not access private variables/functions*** **prototype properties** - are defined by Classname.prototype.propertyName = someValue        
      
**static properties** - are defined by Classname.propertyName = someValue        
       
### LINKS - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS - http://javascript.crockford.com/private.html - http://phrogz.net/JS/Classes/OOPinJS.html        
- http://ryanmorr.com/understanding-scope-and-context-in-javascript/        
- https://stackoverflow.com/questions/3066688/why-make-non-privileged-methods        
  
## TypeScript support https://github.com/google/clasp/blob/master/docs/typescript.md    
         
        
## CLASP  Guide ### References: https://codelabs.developers.google.com/codelabs/clasp/#0 https://developers.google.com/apps-script/guides/clasp        
        
### Install      
 npm install @google/clasp -g ### Enable Google Apps Script API at https://script.google.com/home/usersettings        
      
### login to google clasp login ### clone the script-project to local       
    clasp clone <scriptId>        
 ### pull newest code to local clasp pull ### push newest code back to google      
 clasp push  ### open the script on the Cloud clasp open              
