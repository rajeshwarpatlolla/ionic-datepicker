(function (doc, cssText) {
    var styleEl = doc.createElement("style");
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, ".selected_date_full {\n" +
"  color: #387EF5;\n" +
"  font-weight: bold;\n" +
"  text-align: center;\n" +
"  padding-bottom: 5px;\n" +
"}\n" +
"\n" +
".color_blue {\n" +
"  color: rgb(56, 126, 245);\n" +
"}\n" +
"\n" +
".bg_color_blue {\n" +
"  background-color: rgb(56, 126, 245);\n" +
"}\n" +
"\n" +
".date_col:hover {\n" +
"  background-color: rgba(56, 126, 245, 0.5);\n" +
"  cursor: pointer;\n" +
"}\n" +
"\n" +
".date_col:active {\n" +
"  background-color: rgba(56, 126, 245, 1);\n" +
"  cursor: pointer;\n" +
"}\n" +
"\n" +
".no_padding {\n" +
"  padding: 0;\n" +
"}\n" +
"\n" +
".date_cell {\n" +
"  padding: 5px;\n" +
"}\n" +
"\n" +
".date_selected {\n" +
"  background-color: rgba(56, 126, 245, 1);\n" +
"}\n" +
"\n" +
".today {\n" +
"  background-color: rgba(186, 186, 186, 1);\n" +
"}\n" +
"\n" +
".pointer_events_none {\n" +
"  pointer-events: none !important;\n" +
"  color: #AAAAAA;\n" +
"}\n" +
"\n" +
".select_section {\n" +
"  padding: 0;\n" +
"}\n" +
"\n" +
".select_section label {\n" +
"  padding: 12px;\n" +
"}\n" +
"\n" +
".select_section select {\n" +
"  font-size: 12px;\n" +
"  font-weight: bold;\n" +
"  padding: 2px 10px;\n" +
"  direction: ltr;\n" +
"  left: 0;\n" +
"  width: 100%;\n" +
"  max-width: 100%;\n" +
"}\n" +
"\n" +
".select_section .item-select:after {\n" +
"  right: 4px;\n" +
"  border-top: 4px solid;\n" +
"  border-right: 4px solid rgba(0, 0, 0, 0);\n" +
"  border-left: 4px solid rgba(0, 0, 0, 0);\n" +
"}\n" +
"\n" +
".left_arrow {\n" +
"  direction: rtl;\n" +
"}\n" +
"\n" +
".right_arrow {\n" +
"\n" +
"}\n" +
".ionic_datepicker_modal_content .selected_date_full {\n" +
"  font-size: 20px;\n" +
"}\n" +
".font_22px {\n" +
"  font-size: 22px;\n" +
"}\n" +
".cal-button {\n" +
"    padding: 0px !important;\n" +
"    font-size: 14px !important;\n" +
"}\n" +
".ionic_datepicker_modal_content {\n" +
"  padding-top: 10%;\n" +
"}\n" +
".ionic_datepicker_modal_content .selected_date_full{\n" +
"  padding: 20px;\n" +
"}\n" +
"@media (min-width: 680px) {\n" +
"  .ionic_datepicker_modal_content {\n" +
"    padding-top: 0;\n" +
"  }\n" +
"  .ionic_datepicker_modal_content .selected_date_full {\n" +
"    font-size: inherit;\n" +
"  }\n" +
"  .ionic_datepicker_modal_content .selected_date_full{\n" +
"    padding: 10px 0 0 0;\n" +
"  }\n" +
"}"));
