import { Request, Response } from 'express';
import pkg from '../../package.json';
import { v4 as uuidv4 } from 'uuid';
import { filter } from 'lodash-es';
import osu from 'node-os-utils';
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
			osu.netstat.stats().then((info) => {
				osu.openfiles.openFd().then((open_files) => {
					res.status(200).json({
						url: req.url,
						doc_count: data.length,
						version: pkg.version,
						method: req.method,
						instance: { uptime: osu.os.uptime() },
						net: {
							in: parseInt(filter(info, { interface: 'enp0s3' })[0].inputBytes),
							out: parseInt(filter(info, { interface: 'enp0s3' })[0].outputBytes),
						},
						uuid: uuidv4().replace(/-/g, ''),
						req: { headers: req.headers, route: req.route },
					});
				});
			});
		})
		.catch((err) => next(err));
};

export { post, get };
