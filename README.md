
## G-Sheet Rest.API Sample project
### Required Libraries
|  Name|Library Key  | Version |
|--|--|--|
| Gexpress |  1Lm_jNmD2FWYF-Kgj7AdHVvLEVXZ4c5AXwzd1KJSb48scn0HLBq64um7S|22 |
| Tamotsu |  1OiJIgWlrg_DFHFYX_SoaEzhFJPCmwbbfEHEqYEfLEEhKRloTNVJ-3U4s|31 |
| VLogger |  1lrbMuqcugmzE5_g2QLYXnwo7BQNTP_Cv0sQKNa_a6rDBQiJAaJkvEEPn|3 |

### Copy this code to your project
    function doGet(request) { return App().doGet(request) }  
    function doPost(request) { return App().doPost(request) }

### Copy following files to your project
- App.js
- GExpressTamotsu.js
- SampleModel.js

### To expose a Sheet as RestAPI
- clone SampleModel.js to YourModel.js
- edit YourModel.js as following

#
    var YOUR_MODEL_NAME = new ModelDefinition(
	    'your_rest_endpoint',
	    'Your Sheet Name',
	    'id column',
	    number_of_rowshift,
	    {
	        autoIncrement: false,
	        colShift: 0
	    },
	    {
	        validate: function (on) {
	            // if (!this['First Name']) {
	            //   this.errors['First Name'] = "can't be blank";
	            // }
	        },

	        // instanceProperties
	        something: function () {
	            //return this['Last Name'] +  this['First Name']
	        },
	    }
	);

### Register your model in the App.js

    function setupMiddleware() {  
      app.use(Sample.getMiddleWare());  
      
      // here is your line to register a new model 
      app.use(YOUR_MODEL.getMiddleWare());
    }

### Url to access your Sheet
- Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev    
- Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[value in id_column]**    
- Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**&**order**=field_qrcode&**offset**=0&**limit**=25    
- Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[value in id_column]**&**method=POST**&field_name1=something&field_name2=other_something


## Javascript OOP 
### SUMMARY **private variables**  
 - are declared with the ***var*** keyword inside the object,    
 - and can ***only be accessed by private functions and privileged methods***.  
  
**public properties** - are declared with ***this.variableName*** and   
- may be read/written ***from outside*** the object.    
  
**private functions** - are declared inline inside the object's constructor ***function ABC ()*** - or alternatively may be defined via ***var functionName=function(){...})*** - and may ***only be called by privileged methods*** (including the object's constructor).    
  
**privileged methods** - are declared with ***this.methodName=function(){...}*** - may ***invoked by code external to the object***.    
  
**public methods** - are defined by ***Classname.prototype.methodName = function(){...}*** - and may be called from outside the object, but ***can not access private variables/functions***   
**prototype properties** - are defined by Classname.prototype.propertyName = someValue    
  
**static properties** - are defined by Classname.propertyName = someValue    
   
### LINKS - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS    
- http://javascript.crockford.com/private.html    
- http://phrogz.net/JS/Classes/OOPinJS.html    
- http://ryanmorr.com/understanding-scope-and-context-in-javascript/    
- https://stackoverflow.com/questions/3066688/why-make-non-privileged-methods    
     
    
## CLASP  Guide  
### References:  
https://codelabs.developers.google.com/codelabs/clasp/#0    
https://developers.google.com/apps-script/guides/clasp    
    
### Install  
 npm install @google/clasp -g ### Enable Google Apps Script API at https://script.google.com/home/usersettings    
  
### login to google    
clasp login   
### clone the script-project to local   
    clasp clone <scriptId>    
 ### pull newest code to local    
clasp pull   
### push newest code back to google  
 clasp push  ### open the script on the Cloud clasp open    
    
    
## Dev Test Links  
- Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev    
- Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/sample/A339    
- Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/sample&order=field_qrcode&offset=0&limit=25    
- Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/sample/A339&method=POST&field_khungdien=xyz&field_Salutation=caca5




