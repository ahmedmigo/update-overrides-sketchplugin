function updateSymboleInstance (context){
    var doc = context.document;
    log (context.selection[0].class())
    if (context.selection.count() == 0)
        {
            doc.showMessage("No layer selected, Please select symbol instance layer");
        }
    else if (context.selection.count() == 1 && context.selection[0].class() == MSSymbolInstance ) {
            var selection = context.selection[0];
            var newOverrides = merge_options (getInstanceOverrides(context.selection[0]),selection.overrides())
            selection.overrides = newOverrides;
            doc.showMessage("you symbol instance updated 😎");
    }
    else if (context.selection.count() < 1){  
        doc.showMessage("You are selecting multiple layers, Please select only 1 symbol instance layer that has overrides");
    }
    else {
        doc.showMessage("layer selected doesn't have overrides, Please select only 1 symbol instance layer that has overrides");
    }
}

function getInstanceOverrides (instance) {
    var NewObj = new Object();
    var parentLayers = instance.symbolMaster().children()
    var instantObjectId = instance.objectID().toString();
    for (var i = 0 ; i< parentLayers.count();i++)
        {
            if (parentLayers[i].class() == MSSymbolInstance)
                {
                    var parentLayersObjectId = parentLayers[i].objectID().toString();
                    var tempNewObj = getInstanceOverrides(parentLayers[i])
                    if (!isEmpty(tempNewObj))
                    {
                        NewObj[parentLayersObjectId] = tempNewObj;
                    }

                    if (parentLayers[i].overrides()) {
                    var _tempParentLayers = new Object();
                    for (var keys in parentLayers[i].overrides())
                    {
                        if(!(!isEmpty(parentLayers[i].overrides()[keys]) && parentLayers[i].overrides()[keys].class() == __NSDictionary0))
                        {
                            _tempParentLayers[keys] = parentLayers[i].overrides()[keys]
                            
                        } 
                    }

                    if ( NewObj[parentLayersObjectId] == undefined)
                        {
                            NewObj[parentLayersObjectId] = _tempParentLayers
                        }
                    else {
                            NewObj[parentLayersObjectId] = merge_options(NewObj[parentLayersObjectId],_tempParentLayers)
                        }
                    }   
                } 
        }
    return NewObj;
}


function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { 
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) { 
        if ( obj3[attrname] == undefined || Object.keys(obj3[attrname]).length === 0)
            { 
                obj3[attrname] = obj2[attrname]; 
            }
        else 
            {
                obj3[attrname] = merge_options(obj3[attrname],obj2[attrname])
            }
    }
    return obj3;
}


function isEmpty(obj){
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true
    } else {
        return false
    }
}




