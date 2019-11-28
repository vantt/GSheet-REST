
# G-Sheet Rest.API Sample project  
This small lib and manual help you expose an Google Sheet as a Rest-API the easy way, so you can invoke a url to query and update to the sheet.

## Introduction
Every Google-Sheet when published as a Webservice has following BaseUrl:

 - For Dev: https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev
 - For Live: https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/exec

So your RestAPI to the Sheet will look like following:
- Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev      
- Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[id_value in id_column]**
This url will return all fields of 1 (single) record/row which has id_value in the id_column
- Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**&**order**=field_name&**offset**=0&**limit**=25
This url will return all fields of N (**limit**) records starting at the **offset**, ordering by field_name
- Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[id_value in id_column]**&**method=POST**&field_name1=something&field_name2=other_something
This url will update a single record/row which has id_value in the id_column. All fields listing here will be overwrite. The fields that do not existed in the sheet will be ignored.

## Data Requirement
First you need a Working Google Sheet with 

## Installation
Following installation procedure will be done in **The Script Editor**. Please open at menu **Tool > Script Editor**

### Required Libraries  
This project using the support of 3 other projects:
 1. *GExpress* which helps expose a sheet to Rest  
 2. *Tamotsu* which helps turn   a Sheet into an *ActiveRecord* style 
 3. *GExpressTamotsu* will combine the 2 wonderful projects above.

Please add the required libraries in **The Script Editor** at menu **Resource > Libraries** 

|  Name|Library Key  | Version |  
|--|--|--|  
| Gexpress |  1Lm_jNmD2FWYF-Kgj7AdHVvLEVXZ4c5AXwzd1KJSb48scn0HLBq64um7S | 24 |  
| Tamotsu |  1OiJIgWlrg_DFHFYX_SoaEzhFJPCmwbbfEHEqYEfLEEhKRloTNVJ-3U4s| 31 |  
| GexpressTamotsu |  1OiJIgWlrg_DFHFYX_SoaEzhFJPCmwbbfEHEqYEfLEEhKRloTNVJ-3U4s| 33 |  
 
   
### Copy following files to your project  
- App.js  
- GExpressTamotsu.js  
- SampleModel.js  
  
### Declare your Sheet as a Model
- clone SampleModel.js to YOUR_MODEL_NAME.js  
- edit YOUR_MODEL_NAME.js as following  
-  

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
	         //   	this.errors['First Name'] = "can't be blank"; 
	         // } 
         },  
         
	     // instance-Properties 
	     a_calculated_field_name1: function () { 
		      //return this['Last Name'] +  this['First Name'] 
		 }, 
	  }
	 );  

#### 'your_rest_endpoint'
âsdfấdfádfádfádfádf

#### 'Your Sheet Name'
ádfấdfấdf

#### id_column
ádfấdfádf

#### number_of_rowshift



### Register your model in the App.js  
  
 function setupMiddleware() {      // here is your line to register a new model   
      app.use(YOUR_MODEL_NAME1.getMiddleWare());  
 app.use(YOUR_MODEL_NAME2.getMiddleWare()); app.use(YOUR_MODEL_NAMEX.getMiddleWare()); }  
### Url to access your Sheet  
- Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev      
- Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[value in id_column]** - Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**&**order**=field_qrcode&**offset**=0&**limit**=25      
- Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[value in id_column]**&**method=POST**&field_name1=something&field_name2=other_something  
  
  
## Javascript OOP ### SUMMARY **private variables**    
- are declared with the ***var*** keyword inside the object,      
 - and can ***only be accessed by private functions and privileged methods***.    
    
**public properties** - are declared with ***this.variableName*** and     
- may be read/written ***from outside*** the object.      
    
**private functions** - are declared inline inside the object's constructor ***function ABC ()*** - or alternatively may be defined via ***var functionName=function(){...})*** - and may ***only be called by privileged methods*** (including the object's constructor).      
    
**privileged methods** - are declared with ***this.methodName=function(){...}*** - may ***invoked by code external to the object***.      
    
**public methods** - are defined by ***Classname.prototype.methodName = function(){...}*** - and may be called from outside the object, but ***can not access private variables/functions*** **prototype properties** - are defined by Classname.prototype.propertyName = someValue      
    
**static properties** - are defined by Classname.propertyName = someValue      
     
### LINKS - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS - http://javascript.crockford.com/private.html      
- http://phrogz.net/JS/Classes/OOPinJS.html      
- http://ryanmorr.com/understanding-scope-and-context-in-javascript/      
- https://stackoverflow.com/questions/3066688/why-make-non-privileged-methods      

## TypeScript support  
https://github.com/google/clasp/blob/master/docs/typescript.md  
       
      
## CLASP  Guide ### References: https://codelabs.developers.google.com/codelabs/clasp/#0      
https://developers.google.com/apps-script/guides/clasp      
      
### Install    
 npm install @google/clasp -g ### Enable Google Apps Script API at https://script.google.com/home/usersettings      
    
### login to google clasp login     
### clone the script-project to local     
    clasp clone <scriptId>      
 ### pull newest code to local clasp pull     
### push newest code back to google    
 clasp push  ### open the script on the Cloud clasp open      
      
      
## Dev Test Links - Spreadsheet Link: https://docs.google.com/spreadsheets/d/19F17l6aG1FPmz4nrnF1SFDpI2apGZww9jN74A-jw9z8/edit?usp=drive_web&ouid=114197530501182189783  
- Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev      
- Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/sample/A339      
- Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/sample&order=field_qrcode&offset=0&limit=25      
- Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/sample/A339&method=POST&field_khungdien=xyz&field_Salutation=caca5
