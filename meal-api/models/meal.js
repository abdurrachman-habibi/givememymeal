
var azure = require('azure-storage');

function Meal() {
    var accountName = process.env.AzureStorageName;
    var accountKey = process.env.AzureStorageKey;

    this.storageClient = azure.createTableService(accountName, accountKey);
    this.tableName = "meals";
}

Meal.prototype = {
    query: function (partitionKey, callback) {
        var self = this;

        var query = new azure.TableQuery();

        if(partitionKey === 'Vegetarian') {
            query = query.where('PartitionKey eq ?', partitionKey);
        }

        self.storageClient.queryEntities(self.tableName, query, null, function entitiesQueried(error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, convertAzureObj(result.entries));
            }
        })
    }
};

function convertAzureObj(entity){
    var arr = [];

    entity.forEach(function(item){
        var obj = {};

        for(var prop in item){
            if(item.hasOwnProperty(prop)) {
                obj[prop] = item[prop]['_'];
            }
        }

        arr.push(obj);
    });

    return arr;
}


module.exports = Meal;