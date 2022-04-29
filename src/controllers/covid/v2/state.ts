import { Request, Response } from 'express';
import { states } from '../../../helpers';
import got from 'got';

const findTerm = (term: string) => {
	if (states.includes(term)) {
		return states;
	}
};

async function checkState(state: string, type: string, req: Request, res: Response, next: any) {
	if (type !== 'timeseries') {
		switch (states) {
			case findTerm(state.toUpperCase()):
				got
					.get(`https://api.covidactnow.org/v2/state/${state.toUpperCase()}.json?apiKey=${process.env.API_KEY}`)
					.json()
					.then((data: any) => {
						res.status(200).json({
							url: req.url,
							method: req.method,
							doc_count: Object.keys(data).length,
							data: Object.assign(data, { url: undefined, annotations: undefined }),
						});
					})
					.catch((err) => next(err));
				break;
			default:
				res.redirect('/v2/states');
		}
	} else if (type === 'timeseries') {
		switch (states) {
			case findTerm(state.toUpperCase()):
				got
					.get(`https://api.covidactnow.org/v2/state/${state.toUpperCase()}.timeseries.json?apiKey=${process.env.API_KEY}`)
					.json()
					.then((data: any) => {
						res.status(200).json({
							url: req.url,
							method: req.method,
							doc_count: Object.keys(data).length,
							data: Object.assign(data, { url: undefined, annotations: undefined }),
						});
					})
					.catch((err) => next(err));
				break;
			default:
				res.redirect('/v2/states');
		}
	} else {
		return { error: 'not found' };
	}
}

const post = async (req: Request, res: Response, next: any) => {
	res.status(400).json({ url: req.url, method: req.method, error: 'made a POST request to a GET endpoint' });
};

const get = async (req: Request, res: Response, next: any) => {
	await checkState(req.params.id, req.params.type, req, res, next);
};

const time = async (req: Request, res: Response, next: any) => {
	await checkState(req.params.id, req.params.type, req, res, next);
};

const all = async (req: Request, res: Response, next: any) => {
	if (req.params.type !== 'timeseries') {
		await got
			.get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.API_KEY}`)
			.json()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => next(err));
	} else if (req.params.type === 'timeseries') {
		await got
			.get(`https://api.covidactnow.org/v2/states.timeseries.json?apiKey=${process.env.API_KEY}`)
			.json()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => next(err));
	}
};

export { post, get, all, time };
