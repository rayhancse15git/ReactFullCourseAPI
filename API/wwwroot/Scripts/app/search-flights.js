$('body').on('click','#flt-search-btn',function(event){event.preventDefault();var frm=$("#flt-search-form");if(frm.valid()){var l=Ladda.create(this);l.start();var param=PrepearJasonData2("s-item");var sdata="{'s':"+JSON.stringify(param)+"}";$.ajax({type:'POST',contentType:"application/json; charset=utf-8",url:'/flights/ValidateSearchRequest',dataType:'json',data:sdata,success:function(data){if(data.Result){window.location.href='/flights/search'+EncodeQueryData(param);}else{l.stop();AlertError(data.Message);}},error:function(e){l.stop();}});}});$('body').on("click",".beSwapCity",function(event){event.preventDefault();var ele=$(this);ele.toggleClass("jsRotateClass");var inp1=ele.prev("div").children("div").first().children("input").first();var inp2=ele.parent("li").next("li").children("div").children("div").children("input").first();var d1=inp1.val();var d2=inp2.val();var inp3=ele.prev("div").children("input").first();var inp4=ele.parent("li").next("li").children("div").first().children("input").first();var code1=inp3.val();var code2=inp4.val();var inp5=inp3.next("input");var inp6=inp4.next("input");var city1=inp5.val();var city2=inp6.val();var inp7=inp5.next("input");var inp8=inp6.next("input");var airport1=inp7.val();var airport2=inp8.val();inp1.toggleClass("goToRight");inp2.toggleClass("goToLeft");ele.prev("div").children("div").first().children("div").first().children("ul").html("");ele.parent("li").next("li").children("div").children("div").children("div").first().children("ul").html("");inp1.addClass("focus-action");inp2.addClass("focus-action");setTimeout(function(){inp1.toggleClass("goToRight");inp2.toggleClass("goToLeft");inp1.val(d2);inp2.val(d1);inp3.val(code2);inp4.val(code1);inp5.val(city2);inp6.val(city1);inp7.val(airport2);inp8.val(airport1);},300);});$('body').on('focus','.focus-action',function(event){$(this).select();});$('body').on('click','input[name=type]',function(event){var v=$(this).val();$(".mc-boxes").hide();$(".journey-sn").val("-1");$("#dp-0");$(".first-dest-row").removeClass("w315").removeClass("w225");if(v=="O"||v=="M"){$(".first-dest-row").addClass("w315");$("#first-ret-date").hide();$("#dp-0").attr("data-next","").val("");$("#dp-0").prev("input").val("");$("#rt-0").val("");$("#rt-0").prev("input").val("");if(v=="M"){$("#mc-1").show();$("#dp-0").attr("data-next","dp-1");$("#s-1").val("1");}}else if(v=="R"){$(".first-dest-row").addClass("w225");$("#first-ret-date").show();$("#dp-0").prev("input").val("");$("#dp-0").attr("data-next","rt-0").val("");$("#rt-0").val("");$("#rt-0").prev("input").val("");}});$('body').on('click','.city-add-btn',function(event){event.preventDefault();var id=parseInt($(this).attr("data-id"));var e1=id+1;$("#s-"+e1).val(e1);$("#mc-"+e1).show();$(this).hide();if(id==2){$("#a-"+e1).hide();}else{$("#a-"+e1).show();}
$("#r-"+id).hide();});$('body').on('click','.city-remove-btn',function(event){event.preventDefault();var id=parseInt($(this).attr("data-id"));$("#s-"+id).val("-1");$("#from-"+id).val("");$("#from-"+id).parent("div").next("input").val("");$("#to-"+id).val("");$("#to-"+id).parent("div").next("input").val("");$("#dp-"+id).val("");$("#dp-"+id).prev("input").val("");if(id==1){$('input[name=type]').filter('[value="O"]').prop("checked",true);$(".mc-boxes").hide();$(".journey-sn").val("-1");}else{$("#mc-"+id).hide();var e1=id-1;$("#a-"+e1).show();$("#r-"+e1).show();}});$('body').on('click','.calender-icon',function(event){$(this).prev("input").focus();});$('body').on('click','.flt-adt-spinner-btn',function(event){$("#flt-people-child").val("0")
$("#flt-people-infant").val("0")
ReInitSpinner();SetDisplayText();});$('body').on('click','.flt-child-spinner-btn',function(event){SetDisplayText();});$('body').on('click','input[name=Class]',function(event){SetDisplayText();});function SetDisplayText(){var a=parseInt($("#flt-people-adult").val());var c=parseInt($("#flt-people-child").val());var i=parseInt($("#flt-people-infant").val());var t=a+c+i;if(isNaN(t)){var cType=$("input[name=Class]:checked").attr("data-txt");txt=cType;}else{var txt=t+" Traveller";if(t>1){txt+="s"}
var cType=$("input[name=Class]:checked").attr("data-txt");txt+=", "+cType;}
$("#traveller-summary").html(txt);}
function InitSpinners(){var mx=9;var adt=parseInt($("#flt-people-adult").val());$("#flt-people-adult").TouchSpin({min:1,max:mx,buttondown_class:"btn spinner-btn  flt-adt-spinner-btn",buttonup_class:"btn spinner-btn  flt-adt-spinner-btn"});mx=mx-adt;$("#flt-people-child").TouchSpin({min:0,max:mx,buttondown_class:"btn spinner-btn flt-child-spinner-btn",buttonup_class:"btn spinner-btn flt-child-spinner-btn"});$("#flt-people-infant").TouchSpin({min:0,max:adt,buttondown_class:"btn spinner-btn flt-child-spinner-btn",buttonup_class:"btn spinner-btn flt-child-spinner-btn"});}
function ReInitSpinner(){var adt=parseInt($("#flt-people-adult").val());var mx=9-adt;$("#flt-people-child").trigger("touchspin.updatesettings",{max:mx});$("#flt-people-infant").trigger("touchspin.updatesettings",{max:adt});}
function InitDateOneway(){$('.dt-oneway').daterangepicker({singleDatePicker:true,autoUpdateInput:true,autoApply:true,minDate:$("#dt-from").attr("data-start"),maxDate:$("#dt-from").attr("data-end"),locale:{cancelLabel:'Clear',format:'DD MMM YYYY'}},function(start,end,label){var fid=this.element[0].id;$("#"+fid).prev("input").val(start.format('MM/DD/YYYY'));});}
function InitDepartDates(){$(".date-input").each(function(){var dp=$(this);dp.daterangepicker({singleDatePicker:true,autoUpdateInput:false,autoApply:true,minDate:dp.attr("data-start"),maxDate:dp.attr("data-end"),locale:{cancelLabel:'Clear',format:'DD MMM YYYY'}},function(start,end,label){InitNextDate(dp,start);});});}
$("input[name='type']").change(function(){InitDepartDates();});function InitNextDate(dp,start){dp.prev("input").val(start.format('MM/DD/YYYY'));dp.val(start.format('DD MMM YYYY'));var n=dp.attr("data-next");if(n!=""&&n!=null){var dp2=$("#"+n);dp2.prev("input").val("");dp2.val("");dp2.daterangepicker({singleDatePicker:true,autoUpdateInput:false,autoApply:true,minDate:start.format('DD MMM YYYY'),maxDate:dp2.attr("data-end"),locale:{cancelLabel:'Clear',format:'DD MMM YYYY'}},function(start,end,label){InitNextDate(dp2,start);});if(n=="rt-0"){dp2.data('daterangepicker').toggle();}}}
function InitDestinationAutocomplete(d1,d2){InitAirportAutocomplete(d1);InitAirportAutocomplete(d2);}
function InitAirportAutocomplete(id){var options={url:function(query){$("#"+id).parent("div").prev("i").show();$("#"+id).removeClass("focus-action");return "/flights/searchairports?query="+query;},getValue:"title",requestDelay:700,list:{maxNumberOfElements:25,onClickEvent:function(){var code=$("#"+id).getSelectedItemData().value;var city=$("#"+id).getSelectedItemData().data5;var airport=$("#"+id).getSelectedItemData().data2;var title=$("#"+id).getSelectedItemData().title;$("#"+id).parent("div").next("input").val(code);$("#"+id).parent("div").next("input").next("input").val(city);$("#"+id).parent("div").next("input").next("input").next("input").val(airport);var i=parseInt($("#"+id).attr("data-id"))+1;var t=$('input[name=type]:checked').val();if(i>=1&&t=='M'){$("#from-"+i).val(title);$("#from-"+i).parent("div").next("input").val(code);$("#from-"+i).parent("div").next("input").next("input").val(city);$("#from-"+i).parent("div").next("input").next("input").next("input").val(airport);}},onLoadEvent:function(){$("#"+id).parent("div").prev("i").hide();},onKeyEnterEvent:function(){var code=$("#"+id).getSelectedItemData().value;var city=$("#"+id).getSelectedItemData().data5;var airport=$("#"+id).getSelectedItemData().data2;var title=$("#"+id).getSelectedItemData().title;$("#"+id).parent("div").next("input").val(code);$("#"+id).parent("div").next("input").next("input").val(city);$("#"+id).parent("div").next("input").next("input").next("input").val(airport);var i=parseInt($("#"+id).attr("data-id"))+1;var t=$('input[name=type]:checked').val();if(i>=1&&t=='M'){$("#from-"+i).val(title);$("#from-"+i).parent("div").next("input").val(code);$("#from-"+i).parent("div").next("input").next("input").val(city);$("#from-"+i).parent("div").next("input").next("input").next("input").val(airport);}}},template:{type:"custom",method:function(value,item){var html='<div class="row"><div class="col-sm-7"><div class="row"><div class="col-sm-12 eac-title-1">'+value+'</div><div class="col-sm-12 eac-title-3">'+item.data2+'</div></div></div>';html+='<div class="col-sm-5 eac-title-2">'+item.data4+' <span class="flag flag-'+(item.data3).toLowerCase()+'"></span></div></div>';return html;}},theme:"round"};$("#"+id).easyAutocomplete(options);}
function SetDisplayButtons(){var count=0;$(".journey-sn").each(function(index){if(parseInt($(this).val())>0){count++;}});var i=1;$(".city-remove-btn").each(function(index){if(i<(count-1)){$(this).hide();}
i++;});if(count<=3){i=1;$(".city-add-btn").each(function(index){if(i<3){if(i!=(count-1)){$(this).hide();}}
i++;});}
else{$(".city-add-btn").hide();}}