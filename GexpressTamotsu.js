Tamotsu.initialize();

/* for docs see: https://github.com/coderofsalvation/Gexpress-middleware-RESTsheet */
function ModelDefinition(path, sheetName, idColumn, rowShift, tamotsu_classProperties, tamotsu_instanceProperties) {

    // private function
    function setupModel() {
        var options = {
            sheetName: sheetName,
            idColumn: idColumn,
            rowShift: rowShift,
        };

        Object.keys(tamotsu_classProperties).map(function (column) {
            options[column] = tamotsu_classProperties[column];
        });

        return Tamotsu.Table.define(options, tamotsu_instanceProperties);
    }

    // private function
    function setupMiddleware() {
        return GexpressTamotsuMiddleware(path, {tamotsu: setupModel()});
    }

    // privilege function
    this.getMiddleWare = function () {
        return setupMiddleware();
    };
}

function GexpressTamotsuMiddleware(path, opts) {
    //log(opts);
    if (!path) throw 'GexpressTamotsuMiddleware needs url to run';
    if (!opts.tamotsu) throw 'GexpressTamotsuMiddleware need Tamotsu table definition to run';

    var endpoint;

    var reply = function (data, res) {
        res.set('content-type', 'application/json');
        res.send(JSON.stringify(data));
        res.end();
    };

    var runHandler = function (req, res, handler) {
        var result;
        try {
            var cb = endpoint[req.method.toLowerCase()];

            if (cb)
                result = cb(req, res, handler);
            else
                result = handler();

            reply(result, res)
        } catch (e) {
            reply({error: e}, res)
        }
    };

    function paging(items, offset, limit) {
        var nextOffset = offset + limit;
        var total = items.length;
        var data = items.slice(offset, nextOffset);

        return {
            data: data,
            meta: {
                limit: limit,
                offset: offset,
                size: data.length,
                nextOffset: (nextOffset >= total) ? -1 : nextOffset,
                total: total,
            }
        }
    }

    function columnFilter(items) {
        var excludedColumns = [];
        var result = [];

        if (items.length) {
            // collect the excluded_columns from the first row
            Object.keys(items[0]).map(function (column) {
                const pattern = new RegExp("^excluded_");
                if (pattern.test(column)) {
                    excludedColumns.push(column)
                }
            });

            // remove all excluded_columns
            result = items.map(function (model) {
                excludedColumns.forEach(function (column) {
                    delete model[column]
                });
                return model
            })
        }

        return result;
    }

    function parseRequest(request, options) {
        var limit = parseInt(request.query.limit || opts.limit || 25);
        var offset = parseInt(request.query.offset || 0);
        var query = request.query.query || options.query || {};
        var order = request.query.order || options.order || false;

        return {
            limit: limit,
            offset: offset,
            query: query,
            order: order,
            scriptUrl: ScriptApp.getService().getUrl() + "?" + decodeURIComponent(request.e.queryString),
        };
    }

    endpoint = function (req, res, next) {
        var tamotsuTable = opts.tamotsu;
        var requestParams = parseRequest(req, opts);

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

                        model.updateAttributes(params);

                        return {
                            links: {
                                self: requestParams['scriptUrl'],
                            },
                            data: columnFilter([tamotsuTable.find(req.params.id)]) ,
                        };
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

                        return {
                            links: {
                                self: requestParams['scriptUrl'],
                            },
                            data: items[0]
                        };
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
                var items = tamotsuTable.where(requestParams['query']);

                if (requestParams['order']) items.order(requestParams['order']);

                items = paging(items.all(), requestParams['offset'], requestParams['limit']);
                items['data'] = columnFilter(items['data']);

                return {
                    meta: items['meta'],
                    links: {
                        self: requestParams['scriptUrl'],
                        next: (items['meta']['nextOffset'] < 0) ? "" : requestParams['scriptUrl'].replace(/offset=\d+/, "offset=" + items['meta']['nextOffset']),
                    },
                    data: items['data'],
                };
            };

            runHandler(req, res, handler);
            return
        }

        next()
    };

    return endpoint
}
