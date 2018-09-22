import React from 'react';
import ColoredMap from 'js/components/shared/map/colored-map';
import { wktToGeojson } from 'js/utils/map/wkt-to-geojson';

export default ({ data, latitude, longitude, zoom }) => {
	const mapData = data.map(({ population, polygon }) => ({
		label: population,
		myIndicator: Number.parseFloat(population).toFixed(1),
		contours: polygon,
	}));

	const legend = {
		title: 'Population',
	};

	const colors = [
		'#F2A4C4',
		'#EF91B6',
		'#EB7EA8',
		'#E76C9B',
		'#E35B8E',
		'#DF4A81',
		'#DB3975',
		'#D72969',
		'#D3195C',
		'#D00B51',
	];

	const contentArray = [['Population', 'value', '']];

	const geoJsonData = mapData.map(({ contours,...d }) => ({
		contours: wktToGeojson(contours),
		...d,
	}));

	return (
		<ColoredMap
			data={geoJsonData}
			legend={legend}
			colors={colors}
			longitude={longitude}
			latitude={latitude}
			zoom={zoom}
			hasPoint={true}
			contentArray={contentArray}
		/>
	);
};
