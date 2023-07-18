import asyncHandler from 'express-async-handler';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';


export const getCalendar = asyncHandler(async (req, res) => {
    try {
        // Fetch the calendar page
        const response = await axios.get('https://www.besport.com/group/194384?subtab=past&tab=1');

        // Load the HTML content using Cheerio
        const $ = cheerio.load(response.data);

        // Extract the calendar items
        const calendarItems = $('.res-sum-grp.competition');

        const calendarData = [];

        calendarItems.each((index, element) => {
            const title = $(element).find('h2').text().trim();
            const phase = $(element).find('.res-sum-evt-phase').text().trim();
            const imageHome = $(element).find('.res-sum-team-avatar img').eq(0).attr('src');
            const imageAway = $(element).find('.res-sum-team-avatar img').eq(1).attr('src');
            const teamHome = $(element).find('.res-team-name .res-sum-name').eq(0).text().trim();
            const teamAway = $(element).find('.res-team-name .res-sum-name').eq(1).text().trim();
            const scoreHome = $(element).find('.res-sum-score.res-sum-win').eq(0).text().trim();
            const scoreAway = $(element).find('.res-sum-score.res-sum-lose').eq(0).text().trim();

            calendarData.push({ title, phase, imageHome, imageAway, teamHome, teamAway, scoreHome, scoreAway });
        });

        // Send the calendar data as the API response
        return res.status(201).json({
            status: 'success',
            message: 'Calendar successfully fetched',
            data: calendarData,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status: 'fail',
            message: 'Failed to fetch calendar data',
        });
    }
});


