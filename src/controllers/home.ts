import { Request, Response } from 'express';
import got from 'got';

const post = async (req: Request, res: Response, next: any) => {
	res.status(200).json({
		url: req.url,
		method: req.method,
		req: { headers: req.headers, route: req.route },
	});
};

const get = async (req: Request, res: Response, next: any) => {
	await got
		.get(`https://api.covidactnow.org/v2/counties.json?apiKey=${process.env.API_KEY}`)
		.json()
		.then((data: any) => {
			res.status(200).json({
				url: req.url,
				doc_count: data.length,
				method: req.method,
				req: { headers: req.headers, route: req.route },
			});
		})
		.catch((err) => next(err));
};

export { post, get };
