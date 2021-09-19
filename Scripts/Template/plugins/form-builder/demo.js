var fbOptions = {
    subtypes: {
        text: ['datetime-local']
    },
    onSave: function (e, formData) {
        toggleEdit();
        $('.render-wrap').formRender({
            formData: formData,
            templates: templates
        });
        window.sessionStorage.setItem('formData', JSON.stringify(formData));
    },
    stickyControls: {
        enable: true
    },
    defaultFields: [],
    sortableControls: true,
    disabledActionButtons: ['data', 'clear', 'save'],
    disableInjectedStyle: false,
    disableFields: ['autocomplete', 'button', 'hidden', 'paragraph', 'radio-group', 'number', 'header'],
    disabledAttrs: ['access', 'className', 'inline', 'max', 'maxlength', 'min', 'multiple', 'name', 'other', 'placeholder', 'rows', 'step', 'style', 'subtype', 'toggle', 'value'],
    disabledFieldButtons: {
        text: ['copy']
    }
};
var CriarHolder;
jQuery(function ($) {
    $('.build-wrap').each(function () {
        var jsonObj = $(this).attr("data-form") ? $(this).attr("data-form").replace(/},]/g, "}]").replace(/,\"values\":[]/g, "") : "";
        //var jsonObj = $(this).attr("data-form").replace("},]", "}]").replace("},]", "}]").replace(",\"values\":[]", "").replace("},]", "}]");
        //var objT = jsonObj.length;
        //var tf = -1;
        //while (jsonObj.length != tf) {
        //    tf = jsonObj.length;
        //    jsonObj = jsonObj.replace("},]", "}]").replace("},]", "}]").replace(",\"values\":[]", "").replace("},]", "}]");
        //   // objT = jsonObj.length;
        //   // alert(2);
        //}
        //console.log(jsonObj);
        if (jsonObj !== null && jsonObj !== "" && jsonObj !== "[]" && jsonObj !== "undefined" && jsonObj !== undefined) {
            var obj = $.parseJSON(jsonObj);
            fbOptions.defaultFields = obj;
        }
        if ($(this).html() === "") {
            var frmBuilder = $(this).formBuilder(fbOptions);
        }
    });
    CriarHolder = function criar_formBuilders() {
        $('.build-wrap').each(function () {
            if ($(this).html() === "") {
                fbOptions.defaultFields = [];
                var frmBuilder = $(this).formBuilder(fbOptions);
            }
        });
    }
});