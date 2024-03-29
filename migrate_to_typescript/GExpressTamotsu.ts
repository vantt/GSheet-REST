class GExpressTamotsuMiddlewareTS {

    private path: string;
    private opts: {};

    public constructor(path, opts) {
        if (!path) throw 'GexpressTamotsuMiddleware needs url to run';
        if (!opts.tamotsu) throw 'GexpressTamotsuMiddleware need Tamotsu table definition to run';

        this.path = path;
        this.opts = opts;

        return this.endpoint
    }

    private endpoint = function (req, res, next) {
        var tamotsuTable = opts.tamotsu;

        // spy .end() function to prevent calling twice
        var end = res.end;

        res.end = function () {
            if (!res.endCalled) end();

            res.endCalled = true
        };

        // GET /{path}/:id
        if (req.method === 'GET' && req.url.match(path) && req.params.id) {
            req.route = path + '/:id';

            // update a Record
            if (req.query.method === 'POST') {
                runHandler(req, res, function () {
                    var model = tamotsuTable.find(req.params.id);

                    if (model) {
                        var params = req.query;

                        delete params.method;
                        delete params.path;

                        return model.updateAttributes(params);
                    }

                    throw 'Not found id:' + req.params.id;
                })
            }
            // find and Return a Record
            else {
                runHandler(req, res, function () {
                    try {
                        items = [tamotsuTable.find(req.params.id)];
                        items = columnFilter(items);
                        return items[0];
                    } catch (e) {
                        return {error: e}
                    }
                })
            }
        }

        // GET /{path}
        if (req.url === path && req.method === 'GET') {
            // return a List of Records
            var handler = function () {
                var limit = req.query.limit || opts.limit || 25;
                var offset = req.query.offset || 0;
                var query = req.query.query || opts.query || {};
                var order = req.query.order || opts.order || false;

                var items = tamotsuTable.where(query);

                if (order) items.order(order);

                items = items.all().slice(offset, offset + limit);
                filteredItems = columnFilter(items);

                return {limit: limit, offset: offset, order: order, nitems: items.length, items: filteredItems}
            };

            runHandler(req, res, handler);
            return
        }

        next()
    };

    private reply(data, res) {
        res.set('content-type', 'application/json');
        res.send(JSON.stringify(data));
        res.end();
    }

    private runHandler(req, res, handler) {
        const requestMethod = req.method.toLowerCase();

        let result;

        try {
            let cb = this.endpoint[requestMethod];

            if (cb)
                result = cb(req, res, handler);
            else
                result = handler();

            this.reply(result, res)
        } catch (e) {
            this.reply({error: e}, res)
        }
    }

    private columnFilter(items) {
        let excludedColumns = [];

        // collect the excluded_columns from the first row
        Object.keys(items[0]).map(function (column) {
            const pattern = new RegExp("^excluded_");
            if (pattern.test(column)) {
                excludedColumns.push(column)
            }
        });

        // remove all excluded_columns
        return items.map(function (model) {
            excludedColumns.forEach(function (column) {
                delete model[column]
            });
            return model
        })
    }
}


function GexpressTamotsuMiddleware(path, opts) {



    return endpoint
}