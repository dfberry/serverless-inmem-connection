const inMemoryCache = {
    count: 0,
    name: []
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));

    inMemoryCache.count += 1
    inMemoryCache.name.push(name)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: inMemoryCache
    };
}