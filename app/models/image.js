exports.definition = {
	config: {
		columns: {
		    "date": "text",
		    "name": "text",
		    "filepath": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "image"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};