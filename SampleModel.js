/**
 * tat ca cac columns muon tra ra thi naming convention la field_XxxxYyy
 * tat ca cac columns khong xai thi dat ten la UNUSED,
 * them mot column cuoi cung ten la UNUSED de column nay overwrite len tat cac ca field khac
 */

var Sample = new ModelDefinition(
    '/sample',
    'Person Test',
    'field_qrcode',
    2,
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