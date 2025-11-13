// swagger 文档
defineRouteMeta({
  openAPI: {
    description: 'IP定位',
    summary: 'IP定位',
    tags: ['IP定位'],

    responses: {
      200: {
        description: 'IP定位',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ip: {
                  type: 'string',
                  description: 'IP'
                },
                asn: {
                  type: 'string',
                  description: 'ASN'
                },
                // countryName: {
                //   type: 'string',
                //   description: '国家名称',
                //   example: 'China'
                // },
                countryCodeAlpha2: {
                  type: 'string',
                  description: '国家代码',
                  example: 'CN'
                },
                // countryCodeNumeric: {
                //   type: 'string',
                //   description: '国家代码',
                //   example: '156'
                // },
                // regionName: {
                //   type: 'string',
                //   description: '省/市名称',
                //   example: 'Zhejiang'
                // },
                regionCode: {
                  type: 'string',
                  description: '省/市代码',
                  example: 'CN-ZJ'
                },
                cityName: {
                  type: 'string',
                  description: '城市名称',
                  example: 'Hangzhou'
                },
                latitude: {
                  type: 'string',
                  description: '纬度',
                  example: 30.26
                },
                longitude: {
                  type: 'string',
                  description: '经度',
                  example: 120.13
                }
                // cisp: {
                //   type: 'string',
                //   description: '运营商',
                //   example: '中国电信'
                // }
              }
            }
          }
        }
      }
    }
  }
});

export default defineEventHandler(async event => {
  const address = event.headers.get('ali-esa-inner-client-info');

  if (!address) {
    return {};
  }

  const list = address.split('|');

  return {
    ip: event.headers.get('x-forwarded-for'),
    asn: list[8],
    // countryName: list[4],
    countryCodeAlpha2: list[4],
    // countryCodeNumeric: list[5],
    // regionName: list[5],
    regionCode: list[6],
    cityName: list[5],
    latitude: list[11],
    longitude: list[12]
    // cisp: list[7]
  };
});
