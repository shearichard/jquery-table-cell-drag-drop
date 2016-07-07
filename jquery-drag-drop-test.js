$( document ).ready(function() {

    console.log('V3');
    TCG.SOR.arrFakeIndicators = buildArrayContents(TCG.SOR.arrFakeIndicators, ROWCNT, COLCNT);
    drawTable(TCG.SOR.arrFakeIndicators);
});

var TCG = TCG || function () { };
TCG.SOR= function () {
    var myPrivateVar;
    myPrivateVar = 0;          
    aPrivateFunc0 = function(){
        myPrivateVar += 1;
        return true;
    };
    aPrivateFunc1 = function(){
        myPrivateVar += 1;
        return false;
    };
    return {
        movementDirection : Object.freeze({UP: "UP", DOWN: "DOWN"}),
        arrFakeIndicators : {},
        idOfIndctrBeingDragged : null,
        idOfIndctrBeingDroppedOnto : null,
    };
}();
//var FAKE_INDICATORS = {};
var ROWCNT = 3;
var COLCNT = 4;
//var DRAGGED_ID = null;
//var DROP_TARGET_ID = null;
function buildIdFromIdx(idx){
    return 'OPA_92' + (idx + 1);
}
function buildArrayContents(localArray, rCnt, cCnt){
    var idx = 0
    var arrOrdering = []
    var hshIndicators = {}
    localArray = {}
    for (var i = 0; i < rCnt; ++i) {
        for (var j = 0; j < cCnt; ++j) {
            var indIdent = buildIdFromIdx(idx);
            hshIndicators[indIdent] = indIdent + ' - Filler text about the ' + indIdent + ' indicator.' ;
            arrOrdering.push(indIdent);
            idx++;
        }
    }
    return {'hshIndicators': hshIndicators, 'arrOrdering': arrOrdering};
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getNumbericIDFromID(s)
{
    var a = s.split("_");
    var id = a[a.length-1];
    var id_as_int = parseInt(id);
    return id_as_int;
}
function insertIntoArray(arr, thingToInsert, objTgt, tweaker, mvmntDrctn){
    var idxTgt = arr.indexOf(objTgt) + tweaker;
    var arrout =  [].concat(arr.slice(0,idxTgt), thingToInsert, arr.slice(idxTgt,arr.length));
    //
//  var idxtest0 = arr.indexOf(objTgt) + 1;
//  var arrout0 =  [].concat(arr.slice(0,idxtest0), thingToInsert, arr.slice(idxtest0,arr.length));
//  var idxtest1 = arr.indexOf(objTgt) - 1;
//  var arrout1 =  [].concat(arr.slice(0,idxtest1), thingToInsert, arr.slice(idxtest1,arr.length));
//  console.log(arr);
//  console.log(arrout);
//  console.log(arrout0);
//  console.log(arrout1);
//  //
//  if (mvmntDrctn === TCG.SOR.movementDirection.UP){
//      //debugger;
//  }
//  //
//  //var arrA = arr.slice(0);
//  //Simulates moving 4 on top of 2
//  var arrA = [1,2,3,5];
//  var thingToInsertA = 2;
//  var idxTgtA = 1;
//  var arrAout = [].concat(arrA.slice(0,idxTgtA), thingToInsertA, arrA.slice(idxTgtA,arrA.length));
//  var arrB = [1,3,4,5];
//  var idxTgtB = 2;
//  var arrBout = [].concat(arrB.slice(0,idxTgtB), thingToInsertA, arrB.slice(idxTgtB,arrB.length));
    //
    return arrout;
}

function reorderArrayContents(fkInd, drpTgtId, drggdId)
{
    var workArray = []
    var workArrayFirst = []
    var workArraySecond = []
    var idxDrpTgt = null;
    var idxDrggd = null;

    //Iterate over the current ordering and find the indices
    //corresponding to the Indicator that's being dragged
    //and the indicator that's had it dropped onto
    $.each( fkInd.arrOrdering, function( key, value ) {
//        if (value === parseInt(getNumbericIDFromID(drpTgtId))){
//            idxDrpTgt = value;
//        }
//        if (value === parseInt(getNumbericIDFromID(drggdId))){
//            idxDrggd = value;
//        }
        if (value === drpTgtId){
            idxDrpTgt = value;
        }
        if (value === drggdId){
            idxDrggd = value;
        }

    });

    console.log("Target : " + idxDrpTgt + ". Dragged : " + idxDrggd + " .") 

    //Build an array that contains references to all items
    //except the one being dragged
    $.each( fkInd.arrOrdering, function( key, value ) {
        if (value !== idxDrggd){
            workArray.push(value);
        }else{
            console.debug('Dropping this one. key = ' + key + '. value = ' + value);
        }
        /*
        if (value !== idxDrggd){
            workArray.push(value);
        }else{
            console.debug('Dropping this one. key = ' + key + '. value = ' + value);
        }
        */
        /*
        if (key !== idxDrggd){
            workArray.push(value);
        }else{
            console.debug('Dropping this one. key = ' + key + '. value = ' + value);
        }
        */
        /*
        if (key !== idxDrggd){
            workArray.push(key);
        }
        */
    });

    // splice(position, numberOfItemsToRemove, item)
    console.debug('1+++++++++++++++++++++++++++++++++++++++++++++++++');
    console.debug('fkInd.arrOrdering');
    console.debug(fkInd.arrOrdering);
    console.debug('idxDrpTgt');
    console.debug(idxDrpTgt);
    console.debug('idxDrggd');
    console.debug(idxDrggd);
    console.debug('drggdId (in the form OPA_x)');
    console.debug(drggdId);
    console.debug('getNumbericIDFromID(drggdId)');
    console.debug(getNumbericIDFromID(drggdId));
    console.debug('workArray - Before');
    console.debug(workArray);
    console.debug('workArray - Before');
    console.debug(Math.abs(getNumbericIDFromID(idxDrpTgt) - getNumbericIDFromID(idxDrggd)));

    //"DOWN" is towards the last element of the array
    //"UP" is towards the first element of the array    
    //if (getNumbericIDFromID(idxDrpTgt) > getNumbericIDFromID(idxDrggd)){
    //arr.indexOf(objTgt)
    if (fkInd.arrOrdering.indexOf(idxDrpTgt) > fkInd.arrOrdering.indexOf(idxDrggd)){
        if ((Math.abs(getNumbericIDFromID(idxDrpTgt) - getNumbericIDFromID(idxDrggd))) === 1){
            workArray = insertIntoArray(workArray, drggdId, idxDrpTgt, 1, TCG.SOR.movementDirection.DOWN);
        }else{
            workArray = insertIntoArray(workArray, drggdId, idxDrpTgt, 1, TCG.SOR.movementDirection.DOWN);
        }
    }else{
        if ((Math.abs(getNumbericIDFromID(idxDrpTgt) - getNumbericIDFromID(idxDrggd))) === 1){
            workArray = insertIntoArray(workArray, drggdId, idxDrpTgt, 0, TCG.SOR.movementDirection.UP);
        }else{
            workArray = insertIntoArray(workArray, drggdId, idxDrpTgt, 0, TCG.SOR.movementDirection.UP);
        }
    }
    //
//    if (idxDrpTgt > idxDrggd){
//        if (Math.abs(idxDrpTgt - idxDrggd) == 1){
//            console.debug('PATH A');
//            workArray.splice(idxDrpTgt, 0, getNumbericIDFromID(drggdId));
//        }else{
//            console.debug('PATH B');
//            workArray.splice(idxDrpTgt + 0, 0, getNumbericIDFromID(drggdId));
//        }
//    }else{
//        if (Math.abs(idxDrpTgt - idxDrggd) == 1){
//            console.debug('PATH C');
//            workArray.splice(idxDrpTgt + 0, 0, getNumbericIDFromID(drggdId));
//        }else{
//            console.debug('PATH D');
//            workArray.splice(idxDrpTgt + 0, 0, getNumbericIDFromID(drggdId));
//        }
//    }
    //
    console.debug('workArray - After');
    console.debug(workArray);
    console.debug('2+++++++++++++++++++++++++++++++++++++++++++++++++');


    if (idxDrpTgt > idxDrggd){
        console.log("Going Up");
    }else{
        console.log("Going Down");
    }

    TCG.SOR.arrFakeIndicators = workArray;

    return {'hshIndicators': fkInd.hshIndicators, 'arrOrdering': workArray};
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function HIDEreorderArrayContents(fkInd, drpTgtId, drggdId)
{
    var workArray = []
    var workArrayFirst = []
    var workArraySecond = []
    var idxDrpTgt = null;
    var idxDrggd = null;

    //Iterate over the current ordering and find the indices
    //corresponding to the Indicator that's being dragged
    //and the indicator that's had it dropped onto
    $.each( fkInd.arrOrdering, function( key, value ) {
        if (value === parseInt(drpTgtId)){
            idxDrpTgt = value;
        }
        if (value === parseInt(drggdId)){
            idxDrggd = value;
        }

    });


    console.log("Target : " + idxDrpTgt + ". Dragged : " + idxDrggd + " .") 

    $.each( fkInd.arrOrdering, function( key, value ) {
        if (value !== idxDrggd){
            workArrayFirst.push(value);
        }
    });

    //TEST 0 START
    var workArr = workArrayFirst;
    // splice(position, numberOfItemsToRemove, item)
    workArr.splice(idxDrpTgt, 0, parseInt(drggdId));
    debugger;

    //TEST 0 STOP 

    $.each( workArrayFirst, function( key, value ) {
        if (value === idxDrpTgt){
            if (idxDrpTgt > idxDrggd){
                console.log("Going Up");
            }else{
                console.log("Going Down");
            }
            workArray.push(idxDrggd);
        }
    });

    if (idxDrpTgt > idxDrggd){
        console.log("Going Up");
    }else{
        console.log("Going Down");
    }
    $.each( fkInd.arrOrdering, function( key, value ) {
        if (idxDrpTgt > idxDrggd){
            if (value !== idxDrggd){
                workArray.push(value);
            }
            if (value === idxDrpTgt){
                workArray.push(idxDrggd);
            }
        }else{
            if (value === idxDrpTgt){
                workArray.push(idxDrggd);
            }
            if (value !== idxDrggd){
                workArray.push(value);
            }
        }
    });

    return {'hshIndicators': fkInd.hshIndicators, 'arrOrdering': workArray};
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function drawTable(fkInd)
{
  document.getElementById('tablearea').appendChild(populateTable(null, ROWCNT, COLCNT, TCG.SOR.arrFakeIndicators, function(t, r, c) {return ' row: ' + r + ', cell: ' + c;}));  

  $(function() {

      $( ".div10" ).draggable({
        containment: '#tablearea table',
        cursor: 'move',
        snap: '.div10',
        snapMode: 'inner',
        revert: "invalid",
        stack: ".div10",
        start: function( event, ui ) {
            TCG.SOR.idOfIndctrBeingDragged = this.id;
            console.log("draggable.start");
            console.log('TCG.SOR.idOfIndctrBeingDragged = ' + this.id);
        },
        stop: function( event, ui ) {
            TCG.SOR.idOfIndctrBeingDragged = null;
            TCG.SOR.idOfIndctrBeingDroppedOnto = null;
            console.log("draggable.stop");
        }
    });

    $( ".div10" ).droppable({

      accept: '#tablearea table td .div10 ',
      tolerance: "pointer",
      hoverClass: "ui-state-hover",

      drop: function( event, ui ) {

          TCG.SOR.idOfIndctrBeingDroppedOnto = this.id;
          console.log('TCG.SOR.idOfIndctrBeingDroppedOnto = ' + this.id);
          TCG.SOR.arrFakeIndicators = reorderArrayContents(TCG.SOR.arrFakeIndicators, TCG.SOR.idOfIndctrBeingDroppedOnto, TCG.SOR.idOfIndctrBeingDragged)
          console.log("droppable.drop");
          $('#tablearea').empty();
          console.log('Table cleared');
          drawTable(TCG.SOR.arrFakeIndicators);
          console.log('Dropped!');
      }

    }); 

  });

}
function populateTable(table, rows, cells, fkInd, content) {

    //var is_func = (typeof content === 'function');

    if (!table) table = document.createElement('table');

    var idx = 0;
    for (var i = 0; i < rows; ++i) {

        var row = document.createElement('tr');

        for (var j = 0; j < cells; ++j) {

            row.appendChild(document.createElement('td'));

            var text = fkInd.hshIndicators[fkInd.arrOrdering[idx]];
            var d = document.createElement('div');

            d.setAttribute("id", fkInd.arrOrdering[idx]);
            d.setAttribute("class", "div10 div1a");
            d.textContent = text;
            row.cells[j].appendChild(d);
            idx++;
        }
        table.appendChild(row);
    }

    return table;

}
