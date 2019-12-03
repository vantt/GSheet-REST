
  
# G-Sheet Rest.API sample project 

This small lib and manual help you expose an Google Sheet as a Rest-API the easy way, so you can invoke a url to query and update to the sheet.  
  
## Introduction  
Every Google-Sheet when published as a Webservice has following BaseUrl:  
  
 - For Dev: https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev  
 - For Live: https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/exec  
  
So your Rest.API to the Sheet will look like following (all links are GET method): 
 
 - Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev        
 - Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[id_value in id_column]**  
This url will return all fields of 1 (single) record/row which has id_value in the id_column  
 - Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**&**order**=field_name&**offset**=0&**limit**=25  
This url will return all fields of N (**limit**) records starting at the **offset**, ordering by field_name  
 - Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[id_value in id_column]**&**method=POST**&field_name1=something&field_name2=other_something  
This url will update the *whole single record/row* which has *id_value* in the *id_column*. All fields listing here will be overwrite. The fields which are not existed in the sheet will be ignored.   
  
## Data Requirement  
  
![alt text](https://raw.githubusercontent.com/vantt/GSheet-REST/master/document/images/GuestList.png)  
  
 - First you need a Working Google Sheet as picture.
 - Second, you need (*optional*) an extra-dedicated-row serving as the header for your table.

### Why needing an extra-dedicated-row for table-header?
A table must have a header, and you always have header when working with a table. 
But when exposing the table as a REST.API, sometime, you don't need all the fields, so an extra-dedicated-row should be used to:

 - First, rename a column to *machine-friendly-name* 
 - Second, exclude (ignore) some columns

So finally, you may have two (2) headers on your table. First is for business-usage, and the second is for machine-usage.

The machine-usage-header must be *immediately-above* your data.  In above example, the row-3 is *machine-usage-header*, and the row-2 is *business-usage-header*
 
For any ignored columns, please name it wit prefix excluded_xxxxxx 

## Installation  
Following installation procedure will be done in **The Script Editor**. Please open at menu **Tool > Script Editor**  
  
### Step 1: Add required libraries 
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
   
     
### Step 2: Copy following files to your project 
- App.js    
- GExpressTamotsu.js    
- SampleModel.js    
    
### Step 3: Declare a Sheet as a Model  
- clone SampleModel.js to YOUR_MODEL_NAME.js    (one sheet, one file)
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
                //    this.errors['First Name'] = "can't be blank";   
                // }   
             },    
               
             // instance-Properties   
             a_calculated_field_name1: function () {   
                 //return this['Last Name'] +  this['First Name']   
             },   
          }  
        );    

#### Explain:  'Your Sheet Name'  
This is the exactly name of your Sheet in the Google Spreadsheet file.
Example: ***Checkin List*** or ***Thống kê***
 
![alt text](https://raw.githubusercontent.com/vantt/GSheet-REST/master/document/images/GuestList.png)
  
#### Explain:  'your_rest_endpoint'  
This ***rest_end_point*** is used as the *machine-name* to your sheet, and will be appended to the GSheet's url. 

If your GSheet url is  
https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev  
  
And your sheet name is 'Guest List', you can name the *rest_endpoint* as ***guestlist*** or ***guest_list***  
And the REST url should be:  
https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/***guest_list***  
  
#### Explain:  id_column  
This is the name of the column in which the values are used as *unique-identification (id)* for a row.
Example: ***QR Code***  

#### Explain:  number_of_rowshift  
This is the number of rows will be skip from the first-row of the sheet(1) to the first row of your table, includes the header.

Example: in below table, ***the number_of_rowshift*** is **2**,  the first row of the table is row **3** (the header), 3 - 1 = 2

#### Explain: a_calculated_field_name1
This is called the instance-field or calculated-field. This field is not exist in the table, but will be calculated on the instance of the row object,

#### Explain: validation
Use this feature when you need to do a custom validation before updating/editing the row.


![alt text](https://raw.githubusercontent.com/vantt/GSheet-REST/master/document/images/GuestList.png)
  
  
### Step 4: Repeat step-3 for any exposed-sheets
Do the same things as listed in the step 3 for any other sheets.  
  
### Step 5: Register your models in the App.js    
    
     function setupMiddleware() {      
          // here is your line to register a new models     
          app.use(YOUR_MODEL_NAME1.getMiddleWare());    
          app.use(YOUR_MODEL_NAME2.getMiddleWare());    
          app.use(YOUR_MODEL_NAMEX.getMiddleWare()); 
     } 

   

### Step 6: Test your Sheets

Urls to access your Sheet 
- Base Link https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev        
- Get One Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[value in id_column]** - Get List with Paging https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**&**order**=field_qrcode&**offset**=0&**limit**=25        
- Update a Record https://script.google.com/macros/s/AKfycbzBprX5bCAClCElDBuGHGwvNvBvSpoQdCqid5_XyumJ/dev?path=/**[your_end_point]**/**[value in id_column]**&**method=POST**&field_name1=something&field_name2=other_something    
    
    
