import asyncHandler from 'express-async-handler';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';


export const geRanking = asyncHandler(async (req, res) => {
    try {
        // Fetch the ranking page
        const response = await axios.get('https://scorenco.com/basket/clubs/cran-pringy-basket-2sl2/1-2mee');

        // Load the HTML content using Cheerio
        const $ = cheerio.load(response.data);

        // Extract the ranking table
        const tableRows = $('.MuiButtonBase-root.css-hbp2mf');
        const tablePoints = $('.MuiStack-root.css-ay9jw0');
        const rankingData = [];

        tableRows.each((index, element) => {
            const link = $(element).attr('href');
            const rank = $(element).find('.MuiTypography-root.MuiTypography-body2.css-1hx7oft').text().trim();
            const image = $(element).attr('src');
            const name = $(element).find('.MuiTypography-body2.css-ure99n').text().trim() || $(element).find('.MuiTypography-body2.css-1woilvv').text().trim();

            const pointsElement = tablePoints.eq(index); // Get the corresponding points element
            const firstChildPoints = pointsElement.find('.MuiBox-root').eq(0).text().trim(); // First child points
            const secondChildPoints = pointsElement.find('.MuiBox-root').eq(1).text().trim(); // Second child points

            rankingData.push({ link, rank, image, name, firstChildPoints, secondChildPoints });
        });

        // Send the ranking data as the API response
        return res.status(201).json({
            status: 'success',
            message: 'calendar successfully fetch',
            data: rankingData,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'fail',
            message: 'Failed to fetch ranking data',
        });
    }
});


