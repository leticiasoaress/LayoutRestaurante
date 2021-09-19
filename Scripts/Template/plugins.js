$(function () { loadplugins(); });

function loadplugins() {

  var formElements = function () {
    // Bootstrap datepicker
    var feDatepicker = function () {
      if ($(".datepicker").length > 0) {
        $(".datepicker").datepicker({
          format: "dd/mm/yyyy",
          startDate: "now",
          autoclose: true
        });
      }

    }// END Bootstrap datepicker

    //Bootstrap timepicker
    var feTimepicker = function () {
      // Default timepicker
      if ($(".timepicker").length > 0)
        $('.timepicker').timepicker();

      // 24 hours mode timepicker
      if ($(".timepicker24").length > 0)
        $(".timepicker24").timepicker({ minuteStep: 5, showSeconds: true, showMeridian: false });

    }// END Bootstrap timepicker

    //Daterangepicker 
    var feDaterangepicker = function () {
      if ($(".daterange").length > 0)
        $(".daterange").daterangepicker({ format: 'YYYY-MM-DD', startDate: '2013-01-01', endDate: '2013-12-31' });
    }
    // END Daterangepicker

    //Bootstrap colopicker        
    var feColorpicker = function () {
      // Default colorpicker hex
      if ($(".colorpicker").length > 0)
        $(".colorpicker").colorpicker({ format: 'hex' });

      // RGBA mode
      if ($(".colorpicker_rgba").length > 0)
        $(".colorpicker_rgba").colorpicker({ format: 'rgba' });

      // Sample
      if ($("#colorpicker").length > 0)
        $("#colorpicker").colorpicker();

    }// END Bootstrap colorpicker

    //Bootstrap select
    var feSelect = function () {
      if ($(".select").length > 0) {
        $(".select").selectpicker();

        $(".select").on("change", function () {
          if ($(this).val() == "" || null === $(this).val()) {
            if (!$(this).attr("multiple"))
              $(this).val("").find("option").removeAttr("selected").prop("selected", false);
          } else {
            $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
          }
        });
      }
    }//END Bootstrap select


    //Validation Engine
    var feValidation = function () {
      if ($("form[id^='validate']").length > 0) {

        // Validation prefix for custom form elements
        var prefix = "valPref_";

        //Add prefix to Bootstrap select plugin
        $("form[id^='validate'] .select").each(function () {
          $(this).next("div.bootstrap-select").attr("id", prefix + $(this).attr("id")).removeClass("validate[required]");
        });

        // Validation Engine init
        $("form[id^='validate']").validationEngine('attach', { promptPosition: "bottomLeft", scroll: false });
      }
    }//END Validation Engine

    //Masked Inputs
    var feMasked = function () {
      if ($("input[class^='mask_']").length > 0) {
        $("input.mask_tin").mask('99-9999999');
        $("input.mask_ssn").mask('999-99-9999');
        $("input.mask_date").mask('9999-99-99');
        $("input.mask_product").mask('a*-999-a999');
        $("input.mask_phone").mask('99 (999) 999-99-99');
        $("input.mask_phone_ext").mask('99 (999) 999-9999? x99999');
        $("input.mask_credit").mask('9999-9999-9999-9999');
        $("input.mask_percent").mask('99%');
      }
    }//END Masked Inputs

    //Bootstrap tooltip
    var feTooltips = function () {
      $("body").tooltip({ selector: '[data-toggle="tooltip"]', container: "body" });
    }//END Bootstrap tooltip

    //Bootstrap Popover
    var fePopover = function () {
      $("[data-toggle=popover]").popover();
      $(".popover-dismiss").popover({ trigger: 'focus' });
    }//END Bootstrap Popover

    var feAvaliacoes = function () {
      if ($(".nota").length > 0) {
        $(".nota").each(function () {
          var nota = 0;
          if ($(this).html() !== "") {
            nota = parseFloat($(this).html());
          }
          $(this).html(geraNotaHtml(nota));
        });
      }
    }

    var feToolRequisitosCot = function () {
      if ($(".toolreqcot").length > 0) {
        $(".toolreqcot").each(function () {
          if (!isNaN(parseInt($(this).attr("data-idc"))) && !isNaN(parseInt($(this).attr("data-ide")))) {
            $(this).mouseover(function () {
              ShowRequisitos(this);
            })
          }
        })
      }
    }

    //Tagsinput
    var feTagsinput = function () {

      if ($(".tagsinput").length > 0) {

        $(".tagsinput").each(function () {

          if ($(this).attr("placeholder") != '') {
            var dt = $(this).attr("placeholder");
          } else
            var dt = 'add a tag';
          if ($(this).attr("id") == "quick-search-categoria") {
            $(this).tagsInput({
              width: '100%', height: 'auto', defaultText: "add categoria"//, onAddTag: function (tag) {
              //var del = true;
              //for (var key in datacategoria) {
              //    if (datacategoria[key].indexOf(tag) == 0) {
              //       del = false;
              //        break;
              //    }
              //}
              //if (del) {
              //    $(this).removeTag(tag);
              //}
              //}
            });
            if ($("#quick-search-categoria_tag").length > 0) {
              $("#quick-search-categoria_tag").autocomplete({
                source: datacategoria,
                minLength: 4,
                open: function (event, ui) {
                  var autocomplete = $(".ui-autocomplete:visible");
                  var oldTop = autocomplete.offset().top;
                  var newTop = oldTop - $("#quick-search-categoria_tag").height() + 25;
                  autocomplete.css("top", newTop);
                },
                select: function (event, ui) {
                  var valor = ui.item.value;
                  $('#quick-search-categoria').addTag(valor.substr(0, valor.indexOf(">")));
                  return false;
                }
              });
            }
          }
          else if ($(this).attr("id") == "quick-search-produto") {
            $(this).tagsInput({ width: '100%', height: 'auto', defaultText: dt });
            if ($("#quick-search-produto_tag").length > 0) {

              $("#quick-search-produto_tag").autocomplete({
                source: dataproduto,
                minLength: 4,
                open: function (event, ui) {
                  var autocomplete = $(".ui-autocomplete:visible");
                  var oldTop = autocomplete.offset().top;
                  var newTop = oldTop - $("#quick-search-produto_tag").height() + 25;
                  autocomplete.css("top", newTop);
                },
                select: function (event, ui) {
                  var valor = ui.item.value;
                  $('#quick-search-produto').addTag(valor.substr(0, valor.indexOf(">")));
                  return false;
                }
              });
            }

          } else if ($(this).attr("id") == "quick-search-servico") {
            $(this).tagsInput({
              width: '100%', height: 'auto', defaultText: dt/*, onAddTag: function (tag) {
                                var del = true;
                                for (var key in dataservico) {
                                    if (dataservico[key].indexOf(tag) == 0) {
                                        del = false;
                                        break;
                                    }
                                }
                                if (del) {
                                    $(this).removeTag(tag);
                                }
                            }*/
            });
            if ($("#quick-search-servico_tag").length > 0) {

              $("#quick-search-servico_tag").autocomplete({
                source: dataservico,
                minLength: 4,
                open: function (event, ui) {
                  var autocomplete = $(".ui-autocomplete:visible");
                  var oldTop = autocomplete.offset().top;
                  var newTop = oldTop - $("#quick-search-servico_tag").height() + 25;
                  autocomplete.css("top", newTop);
                },
                select: function (event, ui) {
                  var valor = ui.item.value;
                  $('#quick-search-servico').addTag(valor.substr(0, valor.indexOf(">")));
                  return false;
                }
              });
            }
          }
          else {
            $(this).tagsInput({
              width: '100%', height: 'auto', defaultText: dt
            });
          }
        });
      }
    }// END Tagsinput

    //iCheckbox and iRadion - custom elements
    var feiCheckbox = function () {
      if ($(".icheckbox").length > 0) {
        $(".icheckbox,.iradio").iCheck({ checkboxClass: 'icheckbox_minimal-grey', radioClass: 'iradio_minimal-grey' });
      }
    }
    // END iCheckbox

    //Bootstrap file input
    var feBsFileInput = function () {
      if ($("input.fileinput").length > 0) {
        $("input.fileinput").bootstrapFileInput();
      }

    }
    //END Bootstrap file input

    return {// Init all form element features
      init: function () {
        feDatepicker();
        feTimepicker();
        feColorpicker();
        feSelect();
        feValidation();
        feMasked();
        feTooltips();
        fePopover();
        feAvaliacoes();
        feTagsinput();
        feiCheckbox();
        feBsFileInput();
        feDaterangepicker();
        feToolRequisitosCot();
      }
    }
  }();

  var uiElements = function () {

    //Datatables
    var uiDatatable = function () {
      if ($(".datatable").length > 0) {
        $(".datatable").dataTable();
        $(".datatable").on('page.dt', function () {
          onresize(100);
        });
      }

      if ($(".datatable_simple").length > 0) {
        $(".datatable_simple").dataTable({ "ordering": false, "info": false, "lengthChange": false, "searching": false });
        $(".datatable_simple").on('page.dt', function () {
          onresize(100);
        });
      }
    }//END Datatable        

    //RangeSlider // This function can be removed or cleared.
    var uiRangeSlider = function () {

      //Default Slider with start value
      if ($(".defaultSlider").length > 0) {
        $(".defaultSlider").each(function () {
          var rsMin = $(this).data("min");
          var rsMax = $(this).data("max");

          $(this).rangeSlider({
            bounds: { min: 1, max: 200 },
            defaultValues: { min: rsMin, max: rsMax }
          });
        });
      }//End Default

      //Date range slider
      if ($(".dateSlider").length > 0) {
        $(".dateSlider").each(function () {
          $(this).dateRangeSlider({
            bounds: { min: new Date(2012, 1, 1), max: new Date(2015, 12, 31) },
            defaultValues: { min: new Date(2012, 10, 15), max: new Date(2014, 12, 15) }
          });
        });
      }//End date range slider

      //Range slider with predefinde range            
      if ($(".rangeSlider").length > 0) {
        $(".rangeSlider").each(function () {
          var rsMin = $(this).data("min");
          var rsMax = $(this).data("max");

          $(this).rangeSlider({
            bounds: { min: 1, max: 200 },
            range: { min: 20, max: 40 },
            defaultValues: { min: rsMin, max: rsMax }
          });
        });
      }//End

      //Range Slider with custom step
      if ($(".stepSlider").length > 0) {
        $(".stepSlider").each(function () {
          var rsMin = $(this).data("min");
          var rsMax = $(this).data("max");

          $(this).rangeSlider({
            bounds: { min: 1, max: 200 },
            defaultValues: { min: rsMin, max: rsMax },
            step: 10
          });
        });
      }//End

    }//END RangeSlider

    //Start Knob Plugin
    var uiKnob = function () {

      if ($(".knob").length > 0) {
        $(".knob").knob();
      }

    }//End Knob

    // Start Smart Wizard
    var uiSmartWizard = function () {

      if ($(".wizard").length > 0) {

        //Check count of steps in each wizard
        $(".wizard > ul").each(function () {
          $(this).addClass("steps_" + $(this).children("li").length);
        });//end

        // This par of code used for example
        if ($("#wizard-validation").length > 0) {

          var validator = $("#wizard-validation").validate({
            rules: {
              login: {
                required: true,
                minlength: 2,
                maxlength: 8
              },
              password: {
                required: true,
                minlength: 5,
                maxlength: 10
              },
              repassword: {
                required: true,
                minlength: 5,
                maxlength: 10,
                equalTo: "#password"
              },
              email: {
                required: true,
                email: true
              },
              name: {
                required: true,
                maxlength: 10
              },
              adress: {
                required: true
              }
            }
          });

        }// End of example
        $(".wizard").smartWizard({
          // This part of code can be removed FROM
          //End
          onLeaveStep: function (obj) {
            var wizard = obj.parents(".wizard");
            if (wizard.hasClass("wizard-validation")) {

              var valid = true;

              $('input,textarea', $(obj.attr("href"))).each(function (i, v) {
                valid = validator.element(v) && valid;
              });

              if (!valid) {
                wizard.find(".stepContainer").removeAttr("style");
                validator.focusInvalid();
                return false;
              }

            }

            return true;
          },// <-- TO

          //This is important part of wizard init
          onShowStep: function (obj) {
            var wizard = obj.parents(".wizard");

            if (wizard.hasClass("show-submit")) {

              var step_num = obj.attr('rel');
              var step_max = obj.parents(".anchor").find("li").length;
              if (step_num == step_max) {
                obj.parents(".wizard").find(".actionBar .btn-primary").css("display", "block");
                obj.parents(".wizard").find(".actionBar .disabled").hide();
              }
              else {
                obj.parents(".wizard").find(".actionBar .btn-default").show();
                obj.parents(".wizard").find(".actionBar .btn-primary").css("display", "none");
                obj.parents(".wizard").find(".actionBar .btn-primary").attr("onclick", "SalvarModal();");
              }
            }
            return true;
          }
        });
      }

    }// End Smart Wizard

    //OWL Carousel
    var uiOwlCarousel = function () {

      if ($(".owl-carousel").length > 0) {
        $(".owl-carousel").owlCarousel({ mouseDrag: false, touchDrag: true, slideSpeed: 300, paginationSpeed: 400, singleItem: true, navigation: false, autoPlay: true, pagination: false });
      }
      if ($(".owl-carousel-modalproduto").length > 0) {
        $(".owl-carousel-modalproduto").owlCarousel({ mouseDrag: false, touchDrag: false, slideSpeed: 300, paginationSpeed: 400, singleItem: true, navigation: false, autoPlay: false });
      }

    }//End OWL Carousel

    // Summernote 
    var uiSummernote = function () {
      /* Extended summernote editor */
      if ($(".summernote_evento").length > 0) {

        $(".summernote_evento").summernote({
          height: 400,
          placeholder: '...',
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['picture', 'video', 'link']],
            ['view', ['fullscreen', 'codeview']]
          ]
        });
      }
      /* END Extended summernote editor */

      /* Lite summernote editor */
      if ($(".summernote_lite").length > 0) {

        $(".summernote_lite").on("focus", function () {

          $(".summernote_lite").summernote({
            height: 100, focus: true,
            toolbar: [
              ["style", ["bold", "italic", "underline", "clear"]],
              ["insert", ["link", "picture", "video"]]
            ]
          });
        });
      }
      /* END Lite summernote editor */

      /* Email summernote editor */
      if ($(".summernote_email").length > 0) {

        $(".summernote_email").summernote({
          height: 400, focus: true,
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
          ]
        });

      }
      /* END Email summernote editor */

    }// END Summernote 

    // Custom Content Scroller
    var uiScroller = function () {

      if ($(".scroll").length > 0) {
        $(".scroll").mCustomScrollbar({ axis: "y", autoHideScrollbar: true, autoExpandScrollbar: true, mouseWheelPixels: 40, scrollInertia: 200, advanced: { autoScrollOnFocus: false } });
      }

    }// END Custom Content Scroller

    //Sparkline
    var uiSparkline = function () {

      if ($(".sparkline").length > 0)
        $(".sparkline").sparkline('html', { enableTagOptions: true, disableHiddenCheck: true });

    }// End sparkline              

    $(window).resize(function () {
      if ($(".owl-carousel").length > 0) {
        $(".owl-carousel").data('owlCarousel').destroy();
        uiOwlCarousel();
      }
    });

    return {
      init: function () {
        uiDatatable();
        uiRangeSlider();
        uiKnob();
        uiSmartWizard();
        uiOwlCarousel();
        uiSummernote();
        uiScroller();
        uiSparkline();
      }
    }

  }();

  var templatePlugins = function () {

    var tp_clock = function () {

      function tp_clock_time() {
        var now = new Date();
        var hour = now.getHours();
        var minutes = now.getMinutes();

        hour = hour < 10 ? '0' + hour : hour;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        $(".plugin-clock").html(hour + "<span>:</span>" + minutes);
      }
      if ($(".plugin-clock").length > 0) {

        tp_clock_time();

        window.setInterval(function () {
          tp_clock_time();
        }, 10000);

      }
    }

    var tp_date = function () {

      if ($(".plugin-date").length > 0) {
        //traduzido
        var days = ['Domingo', 'Segunda-feira', 'Ter&ccedil;a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'S&aacute;bado'];
        var months = ['Janeiro', 'Fevereiro', 'Mar&ccedil;o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        var now = new Date();
        var day = days[now.getDay()].toLocaleString();
        var date = now.getDate();
        var month = months[now.getMonth()];
        var year = now.getFullYear();

        //$(".plugin-date").html(day+", "+month+" "+date+", "+year);
        $(".plugin-date").html(day + "<br/>" + date + " de " + month + " de " + year);
      }

    }

    return {
      init: function () {
        tp_clock();
        tp_date();
      }
    }
  }();

  ////////////////////////////////////////////////////////////////////CALENDÁRIO////////////////////////////////////////////
  var fullCalendar = function () {

    var calendar = function () {


      if ($("#calendar").length > 0) {

        function prepare_external_list() {

          $('#external-events .external-event').each(function () {
            var eventObject = { title: $.trim($(this).text()) };

            $(this).data('eventObject', eventObject);
            $(this).draggable({
              zIndex: 999,
              revert: true,
              revertDuration: 0
            });
          });

        }


        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        prepare_external_list();

        var calendar = $('#calendar').fullCalendar({
          locale: "pt-br",
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaWeek,agendaDay'
          },
          defaultView: 'agendaWeek',
          timezone: 'UTC',
          editable: true,
          eventSources: { url: "/Evento/GetTratamentoProcedimento" },
          droppable: true,
          allDaySlot: false,
          slotEventOverlap: false,
          selectable: false,
          forceEventDuration: true,
          defaultTimedEventDuration: '02:00:00',
          dragRevertDuration: 0,
          selectHelper: true,
          eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {

            var myDate = new Date(event.start);
            var myDateEnd = new Date(event.end);

            myDate.setHours(myDate.getHours() + 3);



            var horadecomeco = myDate.toLocaleTimeString();

            if (event.allDay == false && event.end === null) {
              myDateEnd = new Date(event.start);
              myDateEnd.setHours(myDateEnd.getHours() + 2);
            }
            myDateEnd.setHours(myDateEnd.getHours() + 3);

            var texto = "Deseja alterar o evento: '" + event.title + "' para " + ("0" + myDate.getDate()).slice(-2) + "/" + ("0" + (myDate.getMonth() + 1)).slice(-2) + "/" + myDate.getFullYear() + "?";
            if (event.allDay === true && myDateEnd.getDay() !== myDate.getDay() && myDateEnd.getDay() + 1 !== myDate.getDay()) {
              myDateEnd.setHours(myDateEnd.getHours() + 2);
              texto = "Deseja alterar o evento: '" + event.title + "' para " + ("0" + myDate.getDate()).slice(-2) + "/" + ("0" + (myDate.getMonth() + 1)).slice(-2) + "/" + myDate.getFullYear() + " ?";
            } else if (event.allDay === false) {
              texto = "Deseja alterar o evento: '" + event.title + "' para " + ("0" + myDate.getDate()).slice(-2) + "/" + ("0" + (myDate.getMonth() + 1)).slice(-2) + "/" + myDate.getFullYear() + " " + ("0" + myDate.getHours()).slice(-2) + ":" + ("0" + myDate.getMinutes()).slice(-2) + " até " + ("0" + myDateEnd.getDate()).slice(-2) + "/" + ("0" + (myDateEnd.getMonth() + 1)).slice(-2) + "/" + myDateEnd.getFullYear() + " " + ("0" + myDateEnd.getHours()).slice(-2) + ":" + ("0" + myDateEnd.getMinutes()).slice(-2) + " ?";
            }
            //myDate.setHours(myDate.getHours() - 3);

            noty({
              text: texto,
              layout: 'center',
              //modal:true,
              buttons: [
                {
                  addClass: 'btn btn-success btn-clean', text: 'Sim', onClick: function ($noty) {
                    $noty.close();
                    $.ajax({
                      type: 'POST',
                      url: "/Evento/AlterarDiaEvento",
                      crossDomain: true,
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify({
                        IdTratamentoProcedimento: event.id,
                        DtRealizado: myDate,
                        DtRealizadoFinal: myDateEnd
                      }),
                      error: function (data) {
                        revertFunc();
                      }
                    });
                  }
                },
                {
                  addClass: 'btn btn-default btn-clean', text: 'Cancelar', onClick: function ($noty) {
                    revertFunc();
                    $noty.close();
                  }
                }
              ],
              //animation: {
              //  open: 'animated zoomIn', // Animate.css class names
              //  close: 'animated zoomOut', // Animate.css class names
              //}
            });
          },
          eventDragStop: function (event, jsEvent) {
            var trashEl = jQuery('.content-frame-left');
            var ofs = trashEl.offset();
            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);
            if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
              jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
              // $('#calendar').fullCalendar('removeEvents', event.id);
              $.ajax({
                type: 'POST',
                url: '/Evento/RemoverData',
                data: { IdTratamentoProcedimento: event.id },
                error: function (data) {
                  //revertFunc();
                  //location.reload();
                },
                success: function (data) {
                  $('#calendar').fullCalendar('removeEvents', event.id);
                  $('#external-events').append("<a class='list-group-item external-event' value='" + event.id + "' duracao='" + data + "'>" + event.title + "</a>");

                  var eventObject = { title: event.title };

                  $('#external-events a:last-child').data('eventObject', eventObject);
                  $('#external-events a:last-child').draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0
                  });
                }

              });


            }
          },
          //eventReceive: function (event) {

          //    var start = new Date(event.start);
          //    start.setHours(start.getHours() );
          //    noty({
          //        text: "Deseja alterar a duracao do evento: '" + event.title + "' para: " + ("0" + start.getDate()).slice(-2) + "/" + ("0" + (start.getMonth() + 1)).slice(-2) + "/" + start.getFullYear() + " ate " + ("0" + end.getDate()).slice(-2) + "/" + ("0" + (end.getMonth() + 1)).slice(-2) + "/" + end.getFullYear() + " ?",
          //        layout: 'center',
          //        //modal:true,
          //        buttons: [
          //            {
          //                addClass: 'btn btn-success btn-clean', text: 'Sim', onClick: function ($noty) {
          //                    alert("colocar funÃ§Ã£o para salvar no banco");
          //                    $noty.close();
          //                }
          //            },
          //            {
          //                addClass: 'btn btn-default btn-clean', text: 'Cancelar', onClick: function ($noty) {
          //                    revertFunc();
          //                    $noty.close();
          //                }
          //            }
          //        ],
          //        animation: {
          //            open: 'animated zoomIn', // Animate.css class names
          //            close: 'animated zoomOut', // Animate.css class names
          //        }

          //    });
          //},
          eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {

            var start = new Date(event.start);
            var end = new Date(event.end);
            start.setHours(start.getHours());
            end.setHours(end.getHours());

            if (event.allDay === true) {
              var texto = "2Deseja alterar o evento para: '" + event.title + "' para: " + ("0" + start.getDate()).slice(-2) + "/" + ("0" + (start.getMonth() + 1)).slice(-2) + "/" + start.getFullYear() + " até " + ("0" + (end.getDate() - 1)).slice(-2) + "/" + ("0" + (end.getMonth() + 1)).slice(-2) + "/" + end.getFullYear() + " ?";
            } else {
              var texto = "1Deseja alterar o evento para: '" + event.title + "' para " + ("0" + start.getDate()).slice(-2) + "/" + ("0" + (start.getMonth() + 1)).slice(-2) + "/" + start.getFullYear() + " " + ("0" + start.getHours()).slice(-2) + ":" + ("0" + start.getMinutes()).slice(-2) + " até  " + ("0" + end.getDate()).slice(-2) + "/" + ("0" + (end.getMonth() + 1)).slice(-2) + "/" + end.getFullYear() + " " + ("0" + end.getHours()).slice(-2) + ":" + ("0" + end.getMinutes()).slice(-2) + " ?";
            }
            noty({
              text: texto,
              layout: 'center',
              //modal:true,
              buttons: [
                {
                  addClass: 'btn btn-success btn-clean', text: 'Sim', onClick: function ($noty) {
                    $noty.close();
                    $.ajax({
                      type: 'POST',
                      url: "/Evento/AlterarDiaEvento",
                      crossDomain: true,
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify({
                        IdTratamentoProcedimento: event.id,
                        DtRealizado: start,
                        DtRealizadoFinal: end
                      }),
                      error: function (data) {
                        revertFunc();
                        // location.reload();
                      }
                    });
                  }
                },
                {
                  addClass: 'btn btn-default btn-clean', text: 'Cancelar', onClick: function ($noty) {
                    revertFunc();
                    $noty.close();
                  }
                }
              ],
              //animation: {
              //  open: 'animated zoomIn', // Animate.css class names
              //  close: 'animated zoomOut', // Animate.css class names
              //}

            });
          },
          drop: function (date, allDay) {
            var originalEventObject = $(this).data('eventObject');
            var copiedEventObject = $.extend({}, originalEventObject);

            var data = new Date(date);
            data.setHours(data.getHours() + 3);

            var removeevent = $(this);

            copiedEventObject.start = date;
            copiedEventObject.allDay = true;
            copiedEventObject.id = $(this).attr('value');
            noty({
              text: "Deseja adicionar o evento: '" + originalEventObject.title + " ' para: " + ("0" + data.getDate()).slice(-2) + "/" + ("0" + (data.getMonth() + 1)).slice(-2) + "/" + data.getFullYear() + "? ",
              layout: 'center',
              //modal:true,
              buttons: [
                {
                  addClass: 'btn btn-success btn-clean', text: 'Sim', onClick: function ($noty) {
                    $noty.close();
                    $.ajax({
                      type: 'POST',
                      url: "/Evento/AdicionarDataEvento",
                      crossDomain: true,
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify({
                        IdTratamentoProcedimento: copiedEventObject.id,
                        DtRealizado: data,
                      }),
                      error: function (data) {
                        revertFunc();

                      },
                      success: function (data) {
                        copiedEventObject.end = data.end;
                        //copiedEventObject.start = data.start;
                        //alert(data.end);
                        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                         location.reload();
                        //$("#calendar").load('/Evento/');
                        removeevent.remove();
                      }
                    });
                  }
                },
                {
                  addClass: 'btn btn-default btn-clean', text: 'Cancelar', onClick: function ($noty) {
                    $noty.close();
                    revertFunc();
                  }
                }
              ],
              //animation: {
              //  open: 'animated zoomIn', // Animate.css class names
              //  close: 'animated zoomOut', // Animate.css class names
              //}
            });
          }
        });

        $("#new-event").on("click", function () {
          var et = $("#new-event-text").val();
          if (et != '') {
            $("#external-events").prepend('<a class="list-group-item external-event">' + et + '</a>');
            prepare_external_list();
          }
        });

      }
    }
    return {
      init: function () {
        calendar();
      }
    }
  }();

  formElements.init();
  uiElements.init();
  templatePlugins.init();

  fullCalendar.init();

  /* My Custom Progressbar */
  $.mpb = function (action, options) {

    var settings = $.extend({
      state: '',
      value: [0, 0],
      position: '',
      speed: 20,
      complete: null
    }, options);

    if (action == 'show' || action == 'update') {

      if (action == 'show') {
        $(".mpb").remove();
        var mpb = '<div class="mpb ' + settings.position + '">\n\
                               <div class="mpb-progress'+ (settings.state != '' ? ' mpb-' + settings.state : '') + '" style="width:' + settings.value[0] + '%;"></div>\n\
                           </div>';
        $('body').append(mpb);
      }

      var i = $.isArray(settings.value) ? settings.value[0] : $(".mpb .mpb-progress").width();
      var to = $.isArray(settings.value) ? settings.value[1] : settings.value;

      var timer = setInterval(function () {
        $(".mpb .mpb-progress").css('width', i + '%'); i++;

        if (i > to) {
          clearInterval(timer);
          if ($.isFunction(settings.complete)) {
            settings.complete.call(this);
          }
        }
      }, settings.speed);

    }

    if (action == 'destroy') {
      $(".mpb").remove();
    }

  }
  /* Eof My Custom Progressbar */


  // New selector case insensivity        
  $.expr[':'].containsi = function (a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };
}

Object.size = function (obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

;
$(document).on('dragstart', '.fc-day-grid-event, .external-event ', function () {
  var duracao = $(this).attr('duracao');
  $('#calendar').fullCalendar("getView").calendar.defaultTimedEventDuration = moment.duration(duracao);
});
