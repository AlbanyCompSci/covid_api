import { Request, Response } from 'express';
import { allFIPs, stateFIPs } from '../fips';
import { states } from '../helpers';

const post = async (req: Request, res: Response, next: any) => {
	res.status(400).json({
		url: req.url,
		method: req.method,
		error: 'made a POST request to a GET endpoint',
	});
};

const getFips = async (req: Request, res: Response, next: any) => {
	if (req.params.type === 'state') {
		res.status(200).json({
			url: req.url,
			doc_count: Object.keys(stateFIPs).length,
			method: req.method,
			fips: stateFIPs,
		});
	} else if (req.params.type === 'county') {
		if (req.params.id && states.includes(req.params.id.toUpperCase())) {
			res.status(200).json({
				url: req.url,
				doc_count: 1,
				method: req.method,
				fips: Object.fromEntries(Object.entries(allFIPs).filter(([key, value]) => value.stateAbbr === req.params.id.toUpperCase())),
			});
		} else {
			res.status(200).json({
				url: req.url,
				doc_count: Object.keys(allFIPs).length,
				method: req.method,
				fips: allFIPs,
			});
		}
	} else {
		res.redirect('/fips');
	}
};

const get = async (req: Request, res: Response, next: any) => {
	res.status(200).json({
		url: req.url,
		method: req.method,
	});
};

export { post, get, getFips };
