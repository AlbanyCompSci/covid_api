import { Request, Response } from 'express';
import got from 'got';

const post = async (req: Request, res: Response, next: any) => {
	res.status(400).send({ error: 'made a POST request to a GET endpoint' });
};
const get = async (req: Request, res: Response, next: any) => {
	await got
		.get(`https://api.covidactnow.org/v2/state/${req.params.id.toUpperCase()}.json?apiKey=${process.env.API_KEY}`)
		.json()
		.then((data) => {
			res.status(200).send({ data });
			console.log(data);
		})
		.catch((err) => next(err));
};

export { post, get };
