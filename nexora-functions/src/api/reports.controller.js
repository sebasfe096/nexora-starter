'use strict';

const reportsService = require('../services/reports.service');

exports.generateStockReport = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    try {

        const reportResult =  reportsService.processReportGeneration();

        console.info(JSON.stringify({
            severity: 'INFO',
            message: 'Generating stock report',
            secretHint: reportResult.secretHint
        }));


        return res.status(200).json({
            status: 'success',
            message: reportResult.message,
            timestamp: reportResult.timestamp
        });

    } catch (error) {
        console.error('Error in reports controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};