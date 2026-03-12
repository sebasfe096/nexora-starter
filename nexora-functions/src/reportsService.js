
const functions = require('@google-cloud/functions-framework');
const REPORT_SECRET = process.env.REPORT_SECRET;

functions.http('generateStockReport', (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    console.info(JSON.stringify({
        severity: 'INFO',
        message: 'Generating stock report',
        secretHint: `${REPORT_SECRET?.substring(0, 4)}****`
    }));

    res.status(200).json({
        status: 'success',
        message: 'Report generation started',
        timestamp: new Date().toISOString()
    });
});