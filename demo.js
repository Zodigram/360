function highlightCurrentCode() {
    $("#code_"+registers["rip"]).css('background-color','#df9857');
}

function undoHighlightCurrentCode(){
   $("#code_"+registers["rip"]).css("background-color","");
}

var show_registers_64 = function(){
    for(var x=0; x < register_name_64.length; x++){
       $("#"+register_name_64[x]).html(registers[register_name_64[x]])
    }
}

var show_rflag = function(){
    for(var x=0; x < rflag_names.length; x++){
       $("#"+rflag_names[x]).html(rflag[rflag_names[x]])
    }
}

var get_current_code = function(){
    for(var x = 0; x < address_code_table.length ; x++){
        if(address_code_table[x]["address"] ==  registers["rip"]){
            return address_code_table[x]["code"];
        }
    }
    return ""
}

var get_input=function() {
    for (var x=0;x<10;x++) {

        update_extremes_table_value()
        update_extremes_table_view()
    }
}

/*
  The most important part!!!!
  1. Run each code line step by step.
  2. Here, you need to build functions to handle individual operation codes.
  3. In this demo, we have "mov", "sub", "push", "pop", "ret", "leave", "call".
*/
var execute = function(){
    if(address_code_table.length == 0){
        return false
    }
    var current_code = $.trim(get_current_code());
    if(current_code.length == 0){
        return false
    }
    undoHighlightCurrentCode();
    if(current_code.indexOf('mov') == 0){
        mov_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('sub') == 0){
        sub_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('add') == 0){
        add_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('push') == 0){
        push_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('pop') == 0){
        pop_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('ret') == 0){
        ret_handler(current_code);
    }else if(current_code.indexOf('leave') == 0){
        leave_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('call') == 0){
        function_handler(current_code);
    }else if(current_code.indexOf('cmp')==0) {
        cmp_handler(current_code);
        registers["rip"] -= 4;
    }else if(current_code.indexOf('je')==0) {
        je_handler(current_code)
    }else if(current_code.indexOf('jne')==0) {
        jne_handler(current_code)
    }else if(current_code.indexOf('jge')==0) {
        jge_handler(current_code)
    }else if(current_code.indexOf('jg')==0) {
        jg_handler(current_code)
    }else if(current_code.indexOf('jle')==0) {
        jle_handler(current_code)
    }else if(current_code.indexOf('jl')==0) {
        jl_handler(current_code)
    }else{
        registers["rip"] -= 4;
    }
    highlightCurrentCode();
    update_stack_table_view();
    update_extremes_table_value();
    update_extremes_table_view();
    show_registers_64();
    return true
}

/*
  initial the stack, the registers
  1.  Return address for "main" function is assumed to be 200.
  2.  The rbp of the function that calls the main function is assumed to be 3000.
  3.  The current stack/stack start address is assumed to be 2000.
  4.  The text section is started at 1000.
*/
var initial_stack_table_and_registers = function(){
    //stack_table = [];
    
    stack_table = [];
    update_stack_table_value(2008,0,4)
    update_stack_table_value(2004,0,4)
	stack_start_address =  2000;
	text_start_address = 1000;
	registers = {
        "rbp": 3000, "rsp": stack_start_address,
        "rip": 0, "rax": 0, "rbx": 0, "rdi": 0,
        "rsi": 0, "rdx": 0, "rcx": 0, "r8": 0, "r9": 0
	}
    update_stack_table_value(registers["rsp"], 200, 8);  // push return address for main function, assumed 200
    // registers["rsp"] -= 8;
    // update_stack_table_value(registers["rsp"], 3000, 8);  // push the rbp of the function that calls the main function, assumed 3000
}


/*
  initial the address system for all the code lines and create the function look-up table
  1. each function is assumed 4 bytes
  2. allocate each code line an address
  4. save function starting address and function name
  3. target the "main" function
*/
var initial_code_address = function(){
	address_code_table = [];
    function_table = [];
    label_table=[];
    $("#address_code_table").html("");
    var assemblyCode = document.getElementById('assemblyCode');
    var lines = assemblyCode.value.split("\n");
    var length = lines.length
    for(var x = 0 ; x < length ; x++){
        address_code_table.push({
            "address": text_start_address,
            "code": lines[x]
        })
        if(lines[x].indexOf("main") == 0){   // for main function, set RIP register
            function_table.push({
                "label": lines[x].substring(0, lines[x].length - 1),
                "address": text_start_address
            })
            registers["rip"] = text_start_address;
        }
        if(lines[x].indexOf("fun_") == 0){     // for other functions, push into function table
            function_table.push({
                "label": lines[x].substring(0, lines[x].length - 1),
                "address": text_start_address
            })
        }
        if(lines[x].indexOf("SetMax") == 0){     // for other functions, push into function table
            function_table.push({
                "label": lines[x].substring(0, lines[x].length - 1),
                "address": text_start_address
            })
        }
        if(lines[x].indexOf("SetMin") == 0){     // for other functions, push into function table
            function_table.push({
                "label": lines[x].substring(0, lines[x].length - 1),
                "address": text_start_address
            })
        }

        if(lines[x].indexOf(".") == 0){   // for main function, set RIP register
            label_table.push({
                "label": lines[x].substring(0, lines[x].length),
                "address": text_start_address
            })
        }


        $("#address_code_table").append("<tr id='code_" + text_start_address + "'><td>" + text_start_address + "</td><td>" + lines[x] + "</td></tr>");
        text_start_address -= 4;
    }
    $("#function_address_table").html("");
    for (var x = 0; x < function_table.length; x++) {
        $("#function_address_table").append("<tr><td>" + function_table[x]["label"] + "</td><td>" + function_table[x]["address"] + "</td></tr>")
    }

    $("#label_address_table").html("");
   // document.write()
    for (var x = 0; x < label_table.length; x++) {
        $("#label_address_table").append("<tr><td>" + label_table[x]["label"] + "</td><td>" + label_table[x]["address"] + "</td></tr>")
    }
    //document.write(registers["rip"])
}

var num_list_add = function(){
    if (submission_count < 10) {//{document.write("Uo")}
        $("#Add_Number_List").html("");
        var number_to_be_added = document.getElementById('Add_Number_List');
        var numbersplit = number_to_be_added.value//.split("\n");
    // document.write(lines)
        var usable_number=parseInt(numbersplit)
       // num_list.push(usable_number)
        //document.write(typeof usable_number)
        //update_extremes_table_value(usable_number)
        //update_extremes_table_view()
        $("#Add_Number_List").html("")        
        var key_board_index=2048-submission_count*4
        // if (first_extreme==true) {
        //     for(var x=0; x < stack_table.length ; x++){
        //         if(stack_table[x]["address"] == 2004){
        //             extremes_table["min"]=usable_number;
        
        //         }
        //         else if(stack_table[x]["address"] == 2008){
        //             var maxxy = stack_table[x]["content"];
        //             if(maxxy>extremes_table["max"]) {extremes_table["max"]=maxxy}
        
        //         }
        //      }
        // }
        //update_stack_table_value(2004,extremes_table["max"],4)
        //update_stack_table_value(2008,extremes_table["min"],4)
        update_stack_table_value(key_board_index,usable_number,4)
        update_stack_table_view()
        first_extreme=true
        submission_count++

    }
}
/*
  load assembly codes into memory, do the following:
  1.  initial the stack, the registers
  2.  initial the address system for all the code lines and create the function look-up table, target the "main" function
  3.  set the RIP register to "main" function
*/
var load = function(){
    initial_stack_table_and_registers();
    initial_code_address();
    highlightCurrentCode();
    update_stack_table_view();
    show_registers_64();
    update_extremes_table_value();
    update_extremes_table_view();
    $("#assemblyCode").hide();
    $("#address_code").show();
    submission_count=0;
}


/*
  show assembly editor
*/
var edit = function(){
	$("#assemblyCode").show();
    $("#address_code").hide();
}

/*
  document.ready is just like the main function in C/C++ and Java
*/
$( document ).ready(function() {
    show_registers_64(registers);
    /*
        run "execute" function when click on button "step"
    */
    $("#step").click(function() {
        execute();
    });
});

