
var azure = require('azure-storage');

function Meal() {
    var accountName = 'givememymeal';
    var accountKey = 'E7hVwo0eXa6F2/ujue/Z3SC1+TduLb/k3UrdW7RQfFtUNlgRdsCneH9Q5Y5Fai5dXg0p+tkQsw+23UIJCND1pQ==';

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