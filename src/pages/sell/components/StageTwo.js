import React from 'react';
import styles from './../styles.module.scss';
import { FormControl, FormLabel, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { useState } from 'react';
import ValuationActions from 'actions/valuation.action';
import classNames from 'classnames';

const monthsOptions = [
  {
    label: 'Jan',
    value: 1,
  },
  {
    label: 'Feb',
    value: 2,
  },
  {
    label: 'Mar',
    value: 3,
  },
  {
    label: 'Apr',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'Jun',
    value: 6,
  },
  {
    label: 'Jul',
    value: 7,
  },
  {
    label: 'Aug',
    value: 8,
  },
  {
    label: 'Sep',
    value: 9,
  },
  {
    label: 'Oct',
    value: 10,
  },
  {
    label: 'Nov',
    value: 11,
  },
  {
    label: 'Dec',
    value: 12,
  },
];
const yearsOptions = [
  {
    label: '1974',
    value: 1974,
  },
  {
    label: '1975',
    value: 1975,
  },
  {
    label: '1976',
    value: 1976,
  },
  {
    label: '1977',
    value: 1977,
  },
  {
    label: '1978',
    value: 1978,
  },
  {
    label: '1979',
    value: 1979,
  },
  {
    label: '1980',
    value: 1980,
  },
  {
    label: '1981',
    value: 1981,
  },
  {
    label: '1982',
    value: 1982,
  },
  {
    label: '1983',
    value: 1983,
  },
  {
    label: '1984',
    value: 1984,
  },
  {
    label: '1985',
    value: 1985,
  },
  {
    label: '1986',
    value: 1986,
  },
  {
    label: '1987',
    value: 1987,
  },
  {
    label: '1988',
    value: 1988,
  },
  {
    label: '1989',
    value: 1989,
  },
  {
    label: '1990',
    value: 1990,
  },
  {
    label: '1991',
    value: 1991,
  },
  {
    label: '1992',
    value: 1992,
  },
  {
    label: '1993',
    value: 1993,
  },
  {
    label: '1994',
    value: 1994,
  },
  {
    label: '1995',
    value: 1995,
  },
  {
    label: '1996',
    value: 1996,
  },
  {
    label: '1997',
    value: 1997,
  },
  {
    label: '1998',
    value: 1998,
  },
  {
    label: '1999',
    value: 1999,
  },
  {
    label: '2000',
    value: 2000,
  },
  {
    label: '2001',
    value: 2001,
  },
  {
    label: '2002',
    value: 2002,
  },
  {
    label: '2003',
    value: 2003,
  },
  {
    label: '2004',
    value: 2004,
  },
  {
    label: '2005',
    value: 2005,
  },
  {
    label: '2006',
    value: 2006,
  },
  {
    label: '2007',
    value: 2007,
  },
  {
    label: '2008',
    value: 2008,
  },
  {
    label: '2009',
    value: 2009,
  },
  {
    label: '2010',
    value: 2010,
  },
  {
    label: '2011',
    value: 2011,
  },
  {
    label: '2012',
    value: 2012,
  },
  {
    label: '2013',
    value: 2013,
  },
  {
    label: '2014',
    value: 2014,
  },
  {
    label: '2015',
    value: 2015,
  },
  {
    label: '2016',
    value: 2016,
  },
  {
    label: '2017',
    value: 2017,
  },
  {
    label: '2018',
    value: 2018,
  },
  {
    label: '2019',
    value: 2019,
  },
  {
    label: '2020',
    value: 2020,
  },
  {
    label: '2021',
    value: 2021,
  },
  {
    label: '2022',
    value: 2022,
  },
  {
    label: '2023',
    value: 2023,
  },
];
const countryOptions = [
  {
    label: 'Select country',
    value: '',
  },
  {
    label: 'United States',
    value: 'US',
  },
  {
    label: 'United Kingdom',
    value: 'GB',
  },
  {
    label: 'Canada',
    value: 'CA',
  },
  {
    label: 'Australia',
    value: 'AU',
  },
  {
    label: '──────',
    value: 'disabled',
  },
  {
    label: 'Afghanistan',
    value: 'AF',
  },
  {
    label: 'Aland Islands',
    value: 'AX',
  },
  {
    label: 'Albania',
    value: 'AL',
  },
  {
    label: 'Algeria',
    value: 'DZ',
  },
  {
    label: 'American Samoa',
    value: 'AS',
  },
  {
    label: 'Andorra',
    value: 'AD',
  },
  {
    label: 'Angola',
    value: 'AO',
  },
  {
    label: 'Anguilla',
    value: 'AI',
  },
  {
    label: 'Antarctica',
    value: 'AQ',
  },
  {
    label: 'Antigua and Barbuda',
    value: 'AG',
  },
  {
    label: 'Argentina',
    value: 'AR',
  },
  {
    label: 'Armenia',
    value: 'AM',
  },
  {
    label: 'Aruba',
    value: 'AW',
  },
  {
    label: 'Australia',
    value: 'AU',
  },
  {
    label: 'Austria',
    value: 'AT',
  },
  {
    label: 'Azerbaijan',
    value: 'AZ',
  },
  {
    label: 'Bahamas',
    value: 'BS',
  },
  {
    label: 'Bahrain',
    value: 'BH',
  },
  {
    label: 'Bangladesh',
    value: 'BD',
  },
  {
    label: 'Barbados',
    value: 'BB',
  },
  {
    label: 'Belarus',
    value: 'BY',
  },
  {
    label: 'Belgium',
    value: 'BE',
  },
  {
    label: 'Belize',
    value: 'BZ',
  },
  {
    label: 'Benin',
    value: 'BJ',
  },
  {
    label: 'Bermuda',
    value: 'BM',
  },
  {
    label: 'Bhutan',
    value: 'BT',
  },
  {
    label: 'Bolivia',
    value: 'BO',
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
    value: 'BQ',
  },
  {
    label: 'Bosnia and Herzegovina',
    value: 'BA',
  },
  {
    label: 'Botswana',
    value: 'BW',
  },
  {
    label: 'Bouvet Island',
    value: 'BV',
  },
  {
    label: 'Brazil',
    value: 'BR',
  },
  {
    label: 'British Indian Ocean Territory',
    value: 'IO',
  },
  {
    label: 'British Virgin Islands',
    value: 'VG',
  },
  {
    label: 'Brunei Darussalam',
    value: 'BN',
  },
  {
    label: 'Bulgaria',
    value: 'BG',
  },
  {
    label: 'Burkina Faso',
    value: 'BF',
  },
  {
    label: 'Burundi',
    value: 'BI',
  },
  {
    label: 'Cambodia',
    value: 'KH',
  },
  {
    label: 'Cameroon',
    value: 'CM',
  },
  {
    label: 'Canada',
    value: 'CA',
  },
  {
    label: 'Canary Islands',
    value: 'IC',
  },
  {
    label: 'Cape Verde',
    value: 'CV',
  },
  {
    label: 'Cayman Islands',
    value: 'KY',
  },
  {
    label: 'Central African Republic',
    value: 'CF',
  },
  {
    label: 'Chad',
    value: 'TD',
  },
  {
    label: 'Chile',
    value: 'CL',
  },
  {
    label: 'China',
    value: 'CN',
  },
  {
    label: 'Christmas Island',
    value: 'CX',
  },
  {
    label: 'Cocos (Keeling) Islands',
    value: 'CC',
  },
  {
    label: 'Colombia',
    value: 'CO',
  },
  {
    label: 'Comoros',
    value: 'KM',
  },
  {
    label: 'Congo, DR',
    value: 'CD',
  },
  {
    label: 'Congo',
    value: 'CG',
  },
  {
    label: 'Cook Islands',
    value: 'CK',
  },
  {
    label: 'Costa Rica',
    value: 'CR',
  },
  {
    label: "Cote D'Ivoire",
    value: 'CI',
  },
  {
    label: 'Croatia',
    value: 'HR',
  },
  {
    label: 'Curaçao',
    value: 'CW',
  },
  {
    label: 'Cuba',
    value: 'CU',
  },
  {
    label: 'Cyprus',
    value: 'CY',
  },
  {
    label: 'Czech Republic',
    value: 'CZ',
  },
  {
    label: 'Denmark',
    value: 'DK',
  },
  {
    label: 'Djibouti',
    value: 'DJ',
  },
  {
    label: 'Dominica',
    value: 'DM',
  },
  {
    label: 'Dominican Republic',
    value: 'DO',
  },
  {
    label: 'Ecuador',
    value: 'EC',
  },
  {
    label: 'Egypt',
    value: 'EG',
  },
  {
    label: 'El Salvador',
    value: 'SV',
  },
  {
    label: 'Equatorial Guinea',
    value: 'GQ',
  },
  {
    label: 'Eritrea',
    value: 'ER',
  },
  {
    label: 'Estonia',
    value: 'EE',
  },
  {
    label: 'Ethiopia',
    value: 'ET',
  },
  {
    label: 'Faroe Islands',
    value: 'FO',
  },
  {
    label: 'Falkland Islands (Malvinas)',
    value: 'FK',
  },
  {
    label: 'Fiji',
    value: 'FJ',
  },
  {
    label: 'Finland',
    value: 'FI',
  },
  {
    label: 'France',
    value: 'FR',
  },
  {
    label: 'French Guiana',
    value: 'GF',
  },
  {
    label: 'French Polynesia',
    value: 'PF',
  },
  {
    label: 'Gabon',
    value: 'GA',
  },
  {
    label: 'Gambia',
    value: 'GM',
  },
  {
    label: 'Georgia',
    value: 'GE',
  },
  {
    label: 'Germany',
    value: 'DE',
  },
  {
    label: 'Ghana',
    value: 'GH',
  },
  {
    label: 'Gibraltar',
    value: 'GI',
  },
  {
    label: 'Greece',
    value: 'GR',
  },
  {
    label: 'Greenland',
    value: 'GL',
  },
  {
    label: 'Grenada',
    value: 'GD',
  },
  {
    label: 'Guadeloupe',
    value: 'GP',
  },
  {
    label: 'Guam',
    value: 'GU',
  },
  {
    label: 'Guatemala',
    value: 'GT',
  },
  {
    label: 'Guernsey',
    value: 'GG',
  },
  {
    label: 'Guinea',
    value: 'GN',
  },
  {
    label: 'Guinea-Bissau',
    value: 'GW',
  },
  {
    label: 'Guyana',
    value: 'GY',
  },
  {
    label: 'Heard Island and McDonald Islands',
    value: 'HM',
  },
  {
    label: 'Haiti',
    value: 'HT',
  },
  {
    label: 'Vatican City',
    value: 'VA',
  },
  {
    label: 'Honduras',
    value: 'HN',
  },
  {
    label: 'Hong Kong',
    value: 'HK',
  },
  {
    label: 'Hungary',
    value: 'HU',
  },
  {
    label: 'Iceland',
    value: 'IS',
  },
  {
    label: 'India',
    value: 'IN',
  },
  {
    label: 'Indonesia',
    value: 'ID',
  },
  {
    label: 'Iran',
    value: 'IR',
  },
  {
    label: 'Iraq',
    value: 'IQ',
  },
  {
    label: 'Ireland',
    value: 'IE',
  },
  {
    label: 'Isle of Man',
    value: 'IM',
  },
  {
    label: 'Israel',
    value: 'IL',
  },
  {
    label: 'Italy',
    value: 'IT',
  },
  {
    label: 'Jamaica',
    value: 'JM',
  },
  {
    label: 'Japan',
    value: 'JP',
  },
  {
    label: 'Jersey',
    value: 'JE',
  },
  {
    label: 'Jordan',
    value: 'JO',
  },
  {
    label: 'Kazakhstan',
    value: 'KZ',
  },
  {
    label: 'Kenya',
    value: 'KE',
  },
  {
    label: 'Kiribati',
    value: 'KI',
  },
  {
    label: 'North Korea',
    value: 'KP',
  },
  {
    label: 'South Korea',
    value: 'KR',
  },
  {
    label: 'Kosovo',
    value: 'XK',
  },
  {
    label: 'Kuwait',
    value: 'KW',
  },
  {
    label: 'Kyrgyzstan',
    value: 'KG',
  },
  {
    label: 'Laos',
    value: 'LA',
  },
  {
    label: 'Latvia',
    value: 'LV',
  },
  {
    label: 'Lebanon',
    value: 'LB',
  },
  {
    label: 'Lesotho',
    value: 'LS',
  },
  {
    label: 'Liberia',
    value: 'LR',
  },
  {
    label: 'Libya',
    value: 'LY',
  },
  {
    label: 'Liechtenstein',
    value: 'LI',
  },
  {
    label: 'Lithuania',
    value: 'LT',
  },
  {
    label: 'Luxembourg',
    value: 'LU',
  },
  {
    label: 'Macao',
    value: 'MO',
  },
  {
    label: 'Macedonia',
    value: 'MK',
  },
  {
    label: 'Madagascar',
    value: 'MG',
  },
  {
    label: 'Malawi',
    value: 'MW',
  },
  {
    label: 'Malaysia',
    value: 'MY',
  },
  {
    label: 'Maldives',
    value: 'MV',
  },
  {
    label: 'Mali',
    value: 'ML',
  },
  {
    label: 'Malta',
    value: 'MT',
  },
  {
    label: 'Marshall Islands',
    value: 'MH',
  },
  {
    label: 'Martinique',
    value: 'MQ',
  },
  {
    label: 'Mauritania',
    value: 'MR',
  },
  {
    label: 'Mauritius',
    value: 'MU',
  },
  {
    label: 'Mayotte',
    value: 'YT',
  },
  {
    label: 'Mexico',
    value: 'MX',
  },
  {
    label: 'Micronesia',
    value: 'FM',
  },
  {
    label: 'Moldova',
    value: 'MD',
  },
  {
    label: 'Monaco',
    value: 'MC',
  },
  {
    label: 'Mongolia',
    value: 'MN',
  },
  {
    label: 'Montenegro',
    value: 'ME',
  },
  {
    label: 'Montserrat',
    value: 'MS',
  },
  {
    label: 'Morocco',
    value: 'MA',
  },
  {
    label: 'Mozambique',
    value: 'MZ',
  },
  {
    label: 'Myanmar',
    value: 'MM',
  },
  {
    label: 'Namibia',
    value: 'NA',
  },
  {
    label: 'Nauru',
    value: 'NR',
  },
  {
    label: 'Nepal',
    value: 'NP',
  },
  {
    label: 'Netherlands Antilles',
    value: 'AN',
  },
  {
    label: 'Netherlands',
    value: 'NL',
  },
  {
    label: 'New Caledonia',
    value: 'NC',
  },
  {
    label: 'New Zealand',
    value: 'NZ',
  },
  {
    label: 'Nicaragua',
    value: 'NI',
  },
  {
    label: 'Niger',
    value: 'NE',
  },
  {
    label: 'Nigeria',
    value: 'NG',
  },
  {
    label: 'Niue',
    value: 'NU',
  },
  {
    label: 'Norfolk Island',
    value: 'NF',
  },
  {
    label: 'Northern Mariana Islands',
    value: 'MP',
  },
  {
    label: 'Norway',
    value: 'NO',
  },
  {
    label: 'Oman',
    value: 'OM',
  },
  {
    label: 'Pakistan',
    value: 'PK',
  },
  {
    label: 'Palau',
    value: 'PW',
  },
  {
    label: 'Palestinian Territory',
    value: 'PS',
  },
  {
    label: 'Panama',
    value: 'PA',
  },
  {
    label: 'Papua New Guinea',
    value: 'PG',
  },
  {
    label: 'Paraguay',
    value: 'PY',
  },
  {
    label: 'Peru',
    value: 'PE',
  },
  {
    label: 'Philippines',
    value: 'PH',
  },
  {
    label: 'Pitcairn',
    value: 'PN',
  },
  {
    label: 'Poland',
    value: 'PL',
  },
  {
    label: 'Portugal',
    value: 'PT',
  },
  {
    label: 'Puerto Rico',
    value: 'PR',
  },
  {
    label: 'Qatar',
    value: 'QA',
  },
  {
    label: 'Reunion',
    value: 'RE',
  },
  {
    label: 'Romania',
    value: 'RO',
  },
  {
    label: 'Russian Federation',
    value: 'RU',
  },
  {
    label: 'Rwanda',
    value: 'RW',
  },
  {
    label: 'Saint Barthélemy',
    value: 'BL',
  },
  {
    label: 'St. Helena',
    value: 'SH',
  },
  {
    label: 'St. Kitts and Nevis',
    value: 'KN',
  },
  {
    label: 'St. Lucia',
    value: 'LC',
  },
  {
    label: 'Saint Martin (French part)',
    value: 'MF',
  },
  {
    label: 'St. Pierre and Miquelon',
    value: 'PM',
  },
  {
    label: 'St. Vincent and the Grenadines',
    value: 'VC',
  },
  {
    label: 'Samoa',
    value: 'WS',
  },
  {
    label: 'San Marino',
    value: 'SM',
  },
  {
    label: 'Sao Tome and Principe',
    value: 'ST',
  },
  {
    label: 'Saudi Arabia',
    value: 'SA',
  },
  {
    label: 'Senegal',
    value: 'SN',
  },
  {
    label: 'Serbia',
    value: 'RS',
  },
  {
    label: 'Seychelles',
    value: 'SC',
  },
  {
    label: 'Sierra Leone',
    value: 'SL',
  },
  {
    label: 'Singapore',
    value: 'SG',
  },
  {
    label: 'Sint Maarten',
    value: 'SX',
  },
  {
    label: 'Slovakia',
    value: 'SK',
  },
  {
    label: 'Slovenia',
    value: 'SI',
  },
  {
    label: 'Solomon Islands',
    value: 'SB',
  },
  {
    label: 'Somalia',
    value: 'SO',
  },
  {
    label: 'South Africa',
    value: 'ZA',
  },
  {
    label: 'South Georgia and the South Sandwich Islands',
    value: 'GS',
  },
  {
    label: 'South Sudan',
    value: 'SS',
  },
  {
    label: 'Spain',
    value: 'ES',
  },
  {
    label: 'Sri Lanka',
    value: 'LK',
  },
  {
    label: 'Sudan',
    value: 'SD',
  },
  {
    label: 'Suriname',
    value: 'SR',
  },
  {
    label: 'Svalbard & Jan Mayen Islands',
    value: 'SJ',
  },
  {
    label: 'Swaziland',
    value: 'SZ',
  },
  {
    label: 'Sweden',
    value: 'SE',
  },
  {
    label: 'Switzerland',
    value: 'CH',
  },
  {
    label: 'Syrian Arab Republic',
    value: 'SY',
  },
  {
    label: 'Taiwan',
    value: 'TW',
  },
  {
    label: 'Tajikistan',
    value: 'TJ',
  },
  {
    label: 'Tanzania',
    value: 'TZ',
  },
  {
    label: 'Thailand',
    value: 'TH',
  },
  {
    label: 'Timor-Leste',
    value: 'TL',
  },
  {
    label: 'Togo',
    value: 'TG',
  },
  {
    label: 'Tokelau (Tokelau Islands)',
    value: 'TK',
  },
  {
    label: 'Tonga',
    value: 'TO',
  },
  {
    label: 'Trinidad and Tobago',
    value: 'TT',
  },
  {
    label: 'Tunisia',
    value: 'TN',
  },
  {
    label: 'Turkey',
    value: 'TR',
  },
  {
    label: 'Turkmenistan',
    value: 'TM',
  },
  {
    label: 'Turks and Caicos Islands',
    value: 'TC',
  },
  {
    label: 'Tuvalu',
    value: 'TV',
  },
  {
    label: 'US Virgin Islands',
    value: 'VI',
  },
  {
    label: 'Uganda',
    value: 'UG',
  },
  {
    label: 'Ukraine',
    value: 'UA',
  },
  {
    label: 'United Arab Emirates',
    value: 'AE',
  },
  {
    label: 'United Kingdom',
    value: 'GB',
  },
  {
    label: 'US Outlying Islands',
    value: 'UM',
  },
  {
    label: 'United States',
    value: 'US',
  },
  {
    label: 'Uruguay',
    value: 'UY',
  },
  {
    label: 'Uzbekistan',
    value: 'UZ',
  },
  {
    label: 'Vanuatu',
    value: 'VU',
  },
  {
    label: 'Venezuela',
    value: 'VE',
  },
  {
    label: 'Vietnam',
    value: 'VN',
  },
  {
    label: 'Wallis and Futuna Islands',
    value: 'WF',
  },
  {
    label: 'Western Sahara',
    value: 'EH',
  },
  {
    label: 'Yemen',
    value: 'YE',
  },
  {
    label: 'Zambia',
    value: 'ZM',
  },
  {
    label: 'Zimbabwe',
    value: 'ZW',
  },
];

const stateOptions = [
  {
    label: 'Select state',
    value: '',
  },
  {
    label: 'Alabama',
    value: 'AL',
  },
  {
    label: 'Alaska',
    value: 'AK',
  },
  {
    label: 'American Samoa',
    value: 'AS',
  },
  {
    label: 'Arizona',
    value: 'AZ',
  },
  {
    label: 'Arkansas',
    value: 'AR',
  },
  {
    label: 'Armed Forces Americas',
    value: 'AA',
  },
  {
    label: 'Armed Forces Europe',
    value: 'AE',
  },
  {
    label: 'Armed Forces Pacific',
    value: 'AP',
  },
  {
    label: 'California',
    value: 'CA',
  },
  {
    label: 'Colorado',
    value: 'CO',
  },
  {
    label: 'Connecticut',
    value: 'CT',
  },
  {
    label: 'Delaware',
    value: 'DE',
  },
  {
    label: 'District of Columbia',
    value: 'DC',
  },
  {
    label: 'Florida',
    value: 'FL',
  },
  {
    label: 'Georgia',
    value: 'GA',
  },
  {
    label: 'Guam',
    value: 'GU',
  },
  {
    label: 'Hawaii',
    value: 'HI',
  },
  {
    label: 'Idaho',
    value: 'ID',
  },
  {
    label: 'Illinois',
    value: 'IL',
  },
  {
    label: 'Indiana',
    value: 'IN',
  },
  {
    label: 'Iowa',
    value: 'IA',
  },
  {
    label: 'Kansas',
    value: 'KS',
  },
  {
    label: 'Kentucky',
    value: 'KY',
  },
  {
    label: 'Louisiana',
    value: 'LA',
  },
  {
    label: 'Maine',
    value: 'ME',
  },
  {
    label: 'Maryland',
    value: 'MD',
  },
  {
    label: 'Massachusetts',
    value: 'MA',
  },
  {
    label: 'Michigan',
    value: 'MI',
  },
  {
    label: 'Minnesota',
    value: 'MN',
  },
  {
    label: 'Mississippi',
    value: 'MS',
  },
  {
    label: 'Missouri',
    value: 'MO',
  },
  {
    label: 'Montana',
    value: 'MT',
  },
  {
    label: 'Nebraska',
    value: 'NE',
  },
  {
    label: 'Nevada',
    value: 'NV',
  },
  {
    label: 'New Hampshire',
    value: 'NH',
  },
  {
    label: 'New Jersey',
    value: 'NJ',
  },
  {
    label: 'New Mexico',
    value: 'NM',
  },
  {
    label: 'New York',
    value: 'NY',
  },
  {
    label: 'North Carolina',
    value: 'NC',
  },
  {
    label: 'North Dakota',
    value: 'ND',
  },
  {
    label: 'Northern Mariana Islands',
    value: 'MP',
  },
  {
    label: 'Ohio',
    value: 'OH',
  },
  {
    label: 'Oklahoma',
    value: 'OK',
  },
  {
    label: 'Oregon',
    value: 'OR',
  },
  {
    label: 'Pennsylvania',
    value: 'PA',
  },
  {
    label: 'Puerto Rico',
    value: 'PR',
  },
  {
    label: 'Rhode Island',
    value: 'RI',
  },
  {
    label: 'South Carolina',
    value: 'SC',
  },
  {
    label: 'South Dakota',
    value: 'SD',
  },
  {
    label: 'Tennessee',
    value: 'TN',
  },
  {
    label: 'Texas',
    value: 'TX',
  },
  {
    label: 'United States Minor Outlying Islands',
    value: 'UM',
  },
  {
    label: 'Utah',
    value: 'UT',
  },
  {
    label: 'Vermont',
    value: 'VT',
  },
  {
    label: 'Virgin Islands, U.S.',
    value: 'VI',
  },
  {
    label: 'Virginia',
    value: 'VA',
  },
  {
    label: 'Washington',
    value: 'WA',
  },
  {
    label: 'West Virginia',
    value: 'WV',
  },
  {
    label: 'Wisconsin',
    value: 'WI',
  },
  {
    label: 'Wyoming',
    value: 'WY',
  },
];

const industryOptions = [
  {
    label: 'Select industry',
    value: '',
  },
  {
    label: 'Automotive',
    value: 'automotive',
  },
  {
    label: 'Business',
    value: 'business',
  },
  {
    label: 'Design and Style',
    value: 'design-and-style',
  },
  {
    label: 'Education',
    value: 'education',
  },
  {
    label: 'Electronics',
    value: 'electronics',
  },
  {
    label: 'Entertainment',
    value: 'entertainment',
  },
  {
    label: 'Food and Drink',
    value: 'food-and-drink',
  },
  {
    label: 'General Knowledge',
    value: 'general-knowledge',
  },
  {
    label: 'Health and Beauty',
    value: 'health-and-beauty',
  },
  {
    label: 'Hobbies and Games',
    value: 'hobbies-and-games',
  },
  {
    label: 'Home and Garden',
    value: 'home-and-garden',
  },
  {
    label: 'Internet',
    value: 'internet',
  },
  {
    label: 'Lifestyle',
    value: 'lifestyle',
  },
  {
    label: 'Sports and Outdoor',
    value: 'sports-and-outdoor',
  },
  {
    label: 'Travel',
    value: 'travel',
  },
];

const subIndustryOptions = [
  {
    label: 'Select sub-industry',
    value: '',
  },
  {
    label: 'Cars',
    value: 'cars',
  },
  {
    label: 'Motorcycles',
    value: 'motorcycles',
  },
  {
    label: 'Other Automotive',
    value: 'other-automotive',
  },
];

const StageTwo = () => {
  const dispatch = useDispatch();
  const {
    /* formState: ValuationFormState, // Form state */
    data: ValuationFormData,
  } = useSelector(state => state.Valuation);
  const [businessName, setBusinessName] = useState(ValuationFormData.name);
  const [selectedMonth, setSelectedMonth] = useState(ValuationFormData.month);
  const [selectedYear, setSelectedYear] = useState(ValuationFormData.year);
  const [selectedCountry, setSelectedCountry] = useState(
    ValuationFormData.country
  );
  const [selectedState, setSelectedState] = useState(ValuationFormData.state);
  const [selectedIndustry, setSelectedIndustry] = useState(
    ValuationFormData.industry
  );
  const [selectedSubIndustry, setSelectedSubIndustry] = useState(
    ValuationFormData.subIndustry
  );

  const handleCountrySelect = event => {
    let value = event.target.value;
    setSelectedCountry(event.target.value);
    if (value !== 'US') setSelectedState('');
  };
  const handleIndustrySelect = event => {
    let value = event.target.value;
    setSelectedIndustry(event.target.value);
    if (value !== 'automotive') setSelectedSubIndustry('');
  };

  const onBackButtonClick = () => {
    dispatch(ValuationActions.resetStageTwo());
  };
  const onContinueClick = () => {
    dispatch(
      ValuationActions.setStageThree({
        month: selectedMonth,
      })
    );
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainLeft}>
          <div className={styles.textContainer}>
            <div className={styles.bodyText} style={{ marginTop: '50px' }}>
              Tell us about your Ecommerce Store
            </div>
            <div className={styles.subtitle} style={{ marginTop: '5px' }}>
              We need a few key details to get started
            </div>
            <div className={styles.businessDetailsForm}>
              <div className={styles.formRow}>
                <FormControl className={styles.selectionFormControl}>
                  <FormLabel
                    className={classNames(styles.formLabel)}
                    classes={{ label: styles.groupTitle }}
                  >
                    Business or store name
                  </FormLabel>
                  <input
                    type="text"
                    className={styles.textField}
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                  />
                </FormControl>
              </div>
              <div className={styles.formRow}>
                <FormControl className={styles.selectionFormControl}>
                  <FormLabel
                    className={classNames(styles.formLabel)}
                    classes={{ label: styles.groupTitle }}
                  >
                    When did your business begin operations?
                  </FormLabel>
                  <div className={styles.formRowSelects}>
                    <Select
                      value={selectedMonth}
                      onChange={event => setSelectedMonth(event.target.value)}
                      className={styles.selectBox}
                      classes={{
                        select: 'selectInner',
                        selectMenu: 'selectMenu',
                        icon: 'selectIcon',
                      }}
                      MenuProps={{
                        classes: {
                          paper: 'menuPropsPaper',
                          list: 'menuItemList',
                        },
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      {monthsOptions.map((option, idx) => (
                        <MenuItem
                          value={option.value}
                          key={idx}
                          className="menuItem"
                          classes={{ selected: 'menuItemSelected ' }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      value={selectedYear}
                      onChange={event => setSelectedYear(event.target.value)}
                      className={styles.selectBox}
                      classes={{
                        select: 'selectInner',
                        selectMenu: 'selectMenu',
                        icon: 'selectIcon',
                      }}
                      MenuProps={{
                        classes: {
                          paper: 'menuPropsPaper',
                          list: 'menuItemList',
                        },
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      {yearsOptions.map((option, idx) => (
                        <MenuItem
                          value={option.value}
                          key={idx}
                          className="menuItem"
                          classes={{ selected: 'menuItemSelected ' }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </FormControl>
              </div>
              <div className={styles.formRow}>
                <FormControl className={styles.selectionFormControl}>
                  <FormLabel
                    className={classNames(styles.formLabel)}
                    classes={{ label: styles.groupTitle }}
                  >
                    Where is your business located?
                  </FormLabel>
                  <Select
                    value={selectedCountry}
                    onChange={handleCountrySelect}
                    className={styles.selectBox}
                    classes={{
                      select: 'selectInner',
                      selectMenu: 'selectMenu',
                      icon: 'selectIcon',
                    }}
                    MenuProps={{
                      classes: {
                        paper: 'menuPropsPaper',
                        list: 'menuItemList',
                      },
                    }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {countryOptions.map((option, idx) => (
                      <MenuItem
                        value={option.value}
                        key={idx}
                        className="menuItem"
                        classes={{ selected: 'menuItemSelected ' }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {selectedCountry === 'US' && (
                <div className={styles.formRow}>
                  <FormControl className={styles.selectionFormControl}>
                    <FormLabel
                      className={classNames(styles.formLabel)}
                      classes={{ label: styles.groupTitle }}
                    >
                      In which state are you based?
                    </FormLabel>
                    <Select
                      value={selectedState}
                      onChange={event => setSelectedState(event.target.value)}
                      className={styles.selectBox}
                      classes={{
                        select: 'selectInner',
                        selectMenu: 'selectMenu',
                        icon: 'selectIcon',
                      }}
                      MenuProps={{
                        classes: {
                          paper: 'menuPropsPaper',
                          list: 'menuItemList',
                        },
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      {stateOptions.map((option, idx) => (
                        <MenuItem
                          value={option.value}
                          key={idx}
                          className="menuItem"
                          classes={{ selected: 'menuItemSelected ' }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              <div className={styles.formRow}>
                <FormControl className={styles.selectionFormControl}>
                  <FormLabel
                    className={classNames(styles.formLabel)}
                    classes={{ label: styles.groupTitle }}
                  >
                    Which industry do you operate in?
                  </FormLabel>
                  <Select
                    value={selectedIndustry}
                    onChange={handleIndustrySelect}
                    className={styles.selectBox}
                    classes={{
                      select: 'selectInner',
                      selectMenu: 'selectMenu',
                      icon: 'selectIcon',
                    }}
                    MenuProps={{
                      classes: {
                        paper: 'menuPropsPaper',
                        list: 'menuItemList',
                      },
                    }}
                    IconComponent={ExpandMoreIcon}
                  >
                    {industryOptions.map((option, idx) => (
                      <MenuItem
                        value={option.value}
                        key={idx}
                        className="menuItem"
                        classes={{ selected: 'menuItemSelected ' }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {selectedIndustry === 'automotive' && (
                <div className={styles.formRow}>
                  <FormControl className={styles.selectionFormControl}>
                    <FormLabel
                      className={classNames(styles.formLabel)}
                      classes={{ label: styles.groupTitle }}
                    >
                      Refine your industry
                    </FormLabel>
                    <Select
                      value={selectedSubIndustry}
                      onChange={event =>
                        setSelectedSubIndustry(event.target.value)
                      }
                      className={styles.selectBox}
                      classes={{
                        select: 'selectInner',
                        selectMenu: 'selectMenu',
                        icon: 'selectIcon',
                      }}
                      MenuProps={{
                        classes: {
                          paper: 'menuPropsPaper',
                          list: 'menuItemList',
                        },
                      }}
                      IconComponent={ExpandMoreIcon}
                    >
                      {subIndustryOptions.map((option, idx) => (
                        <MenuItem
                          value={option.value}
                          key={idx}
                          className="menuItem"
                          classes={{ selected: 'menuItemSelected ' }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer actions */}
      <div className={classNames(styles.actionFooter, styles.max600)}>
        <a onClick={onBackButtonClick}>&lt; Back</a>
        <a onClick={onContinueClick} className={styles.continueButton}>
          Continue
        </a>
      </div>
    </>
  );
};

export default StageTwo;
