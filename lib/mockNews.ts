export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  url: string;
  publishedAt: string;
}

export const mockNews: NewsItem[] = [
  {
    "id": "CBMia0FVX3lxTFAtV3RlRnR2RlJEZjVPeXJJQ3FMN0JYT0txd1Y5dFFHbE0wb3RLZ3BteUNaVi0wcG5ReWV4R3U2T3BQRGhxS3NHWjFEOWQzTnRLMS1tV2RsR25Ob21qQkZISmd5YVA2R2JVenE0",
    "title": "Rapper Lil Poppa dies in Atlanta at the age of 25 - CNN",
    "description": "• Rapper Lil Poppa dies in Atlanta at the age of 25 - CNN\n• Rapper Lil Poppa dies in Atlanta at the age of 25  CNN...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=367",
    "source": "CNN",
    "url": "https://news.google.com/rss/articles/CBMia0FVX3lxTFAtV3RlRnR2RlJEZjVPeXJJQ3FMN0JYT0txd1Y5dFFHbE0wb3RLZ3BteUNaVi0wcG5ReWV4R3U2T3BQRGhxS3NHWjFEOWQzTnRLMS1tV2RsR25Ob21qQkZISmd5YVA2R2JVenE0?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 15:47:58 GMT"
  },
  {
    "id": "CBMipgFBVV95cUxNbE5SNGx0dW9xSXNqNjlEemJkQTdZUEVhNmlEZDRaOXVXR1NTWmlfME1kcW0wbXdXQkJ4QjkxakNPUVJhZHB2VmhQd0M3aFhRZzJrWkNMT2syeHlpWkVIdlRNQVZxWk1QeU1BNTlYMzlmWGw3akJPdkFSNU80MmpsaTAtZnhGYkNvbUZjdVMtQmVReFVhWUdpSlpISENjUF9Uc0dXYzdn",
    "title": "Steven Knight breaks down 'Peaky Blinders: The Immortal Man' trailer, previews father-son story (exclusive) - Entertainment Weekly",
    "description": "• Steven Knight breaks down 'Peaky Blinders: The Immortal Man' trailer, previews father-son story (exclusive) - Entertainment Weekly\n• Steven Knight breaks down 'Peaky Blinders: The Immortal Man' trailer, previews father-son story (exclusive)  Entertainment Weekly...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=734",
    "source": "Entertainment Weekly",
    "url": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNbE5SNGx0dW9xSXNqNjlEemJkQTdZUEVhNmlEZDRaOXVXR1NTWmlfME1kcW0wbXdXQkJ4QjkxakNPUVJhZHB2VmhQd0M3aFhRZzJrWkNMT2syeHlpWkVIdlRNQVZxWk1QeU1BNTlYMzlmWGw3akJPdkFSNU80MmpsaTAtZnhGYkNvbUZjdVMtQmVReFVhWUdpSlpISENjUF9Uc0dXYzdn?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 14:00:00 GMT"
  },
  {
    "id": "CBMi1gFBVV95cUxONEY5WkRLTXlHeWc4dUc0RjdaYUE3cEQ3S1RkZkxwWFoxd3E0Yi1ad1VnRVFwajFUUWtUbUhiT2ZqUHVuTHR1VG9KTkNFaUhDdFNLcjNjMmxHMDdaNUtLZEY1anhxaUpIQ3VuRXNCUi1oWTZMYnhVUzlhazJ3Z0RralE3WGNRUG9iMmxPZWtxaWZlaUc1UmZTMU9yQ0ZnZGRYUVRMbHh4bVM0UjFYRWFKdXRUMHpyNHI2OU03UWVpenFVU3FYb0R1dTZfZ1RpRFd5U1JHY3Bn",
    "title": "Summerfest unveils star-studded lineup for 2026 - Channel 3000",
    "description": "• Summerfest unveils star-studded lineup for 2026 - Channel 3000\n• Summerfest unveils star-studded lineup for 2026  Channel 3000...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=225",
    "source": "Channel 3000",
    "url": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxONEY5WkRLTXlHeWc4dUc0RjdaYUE3cEQ3S1RkZkxwWFoxd3E0Yi1ad1VnRVFwajFUUWtUbUhiT2ZqUHVuTHR1VG9KTkNFaUhDdFNLcjNjMmxHMDdaNUtLZEY1anhxaUpIQ3VuRXNCUi1oWTZMYnhVUzlhazJ3Z0RralE3WGNRUG9iMmxPZWtxaWZlaUc1UmZTMU9yQ0ZnZGRYUVRMbHh4bVM0UjFYRWFKdXRUMHpyNHI2OU03UWVpenFVU3FYb0R1dTZfZ1RpRFd5U1JHY3Bn?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 12:38:00 GMT"
  },
  {
    "id": "CBMikgFBVV95cUxNNTB5dzkzQWd6dmk0ek8zeU9ieUNRRElwUncyZkNaM3A4SDhKd1JzR3czLTFIRmZVNTByOTNLaUZmblhVQV9xX0otYVpqSGJMVnY5ZDFEQ1Y1YURXWGk0RmhydXozU2R6QnVxN3VibXNmaFdlQTYyNk9BcXNpNkwyeEpaTzVzQzdkeEtwNTVQdTVqdw",
    "title": "‘Southern Charm’s Craig Conover Signs With Innovative Artists Entertainment - Deadline",
    "description": "• ‘Southern Charm’s Craig Conover Signs With Innovative Artists Entertainment - Deadline\n• ‘Southern Charm’s Craig Conover Signs With Innovative Artists Entertainment  Deadline...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=706",
    "source": "Deadline",
    "url": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNNTB5dzkzQWd6dmk0ek8zeU9ieUNRRElwUncyZkNaM3A4SDhKd1JzR3czLTFIRmZVNTByOTNLaUZmblhVQV9xX0otYVpqSGJMVnY5ZDFEQ1Y1YURXWGk0RmhydXozU2R6QnVxN3VibXNmaFdlQTYyNk9BcXNpNkwyeEpaTzVzQzdkeEtwNTVQdTVqdw?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 17:00:00 GMT"
  },
  {
    "id": "CBMivgFBVV95cUxQajRibjZ1VU90d1doY2x3X3dNV0RTX3lSVjFhTkhkTzB5V2pEanNQTWhxdmlGcU80ekxBSjVZN1hZc1VFdlhhaUdVYUhKNEFMbDlLOEJuby1iWElvU2p2LU9MMVI0NVFlMlNqZUV4MmQ0ajVQTVBJVWwwTFlONnJTUlYwUC1WcVZjNHk2OFZuU1JYZ3NjRjQ3QndheGFzb01sMHdoYmJwNTVWdmFFYnVzSXRmQ24zUnZtbUNmOW5n",
    "title": "'GoT' Siblings Kit Harington and Sophie Turner Gag During 'The Dreadful' On-Screen Kiss (Exclusive) - Entertainment Tonight",
    "description": "• 'GoT' Siblings Kit Harington and Sophie Turner Gag During 'The Dreadful' On-Screen Kiss (Exclusive) - Entertainment Tonight\n• 'GoT' Siblings Kit Harington and Sophie Turner Gag During 'The Dreadful' On-Screen Kiss (Exclusive)  Entertainment Tonight...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=449",
    "source": "Entertainment Tonight",
    "url": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQajRibjZ1VU90d1doY2x3X3dNV0RTX3lSVjFhTkhkTzB5V2pEanNQTWhxdmlGcU80ekxBSjVZN1hZc1VFdlhhaUdVYUhKNEFMbDlLOEJuby1iWElvU2p2LU9MMVI0NVFlMlNqZUV4MmQ0ajVQTVBJVWwwTFlONnJTUlYwUC1WcVZjNHk2OFZuU1JYZ3NjRjQ3QndheGFzb01sMHdoYmJwNTVWdmFFYnVzSXRmQ24zUnZtbUNmOW5n?oc=5",
    "publishedAt": "Wed, 18 Feb 2026 16:00:33 GMT"
  },
  {
    "id": "CBMitgFBVV95cUxQT2xzbHYxRUE1V2FWMHNYNE1XYlVnS1pYVEJvX0NUYW1VcjFIMktGY1p5V3Z5Z1dfUEdCVXN1RktNQWVFdkJWamY2LUZvT0ZoNmFQaF9nRjVUZTVINW11MVZWM21ZdE1jOHJqaDFTMmJwYUFrMlRzcHFZT2xoV19jMnJUMjhrUG5RN0N0Sm9SN0R5d093UjFzZmN6ZzlfeFk3dUtQT2l2cWpEd0xQUklRakVGZWxDUQ",
    "title": "UK plans to buy prominent corner property near campus, possibly for entertainment district - A Sea Of Blue",
    "description": "• UK plans to buy prominent corner property near campus, possibly for entertainment district - A Sea Of Blue\n• UK plans to buy prominent corner property near campus, possibly for entertainment district  A Sea Of Blue...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=632",
    "source": "A Sea Of Blue",
    "url": "https://news.google.com/rss/articles/CBMitgFBVV95cUxQT2xzbHYxRUE1V2FWMHNYNE1XYlVnS1pYVEJvX0NUYW1VcjFIMktGY1p5V3Z5Z1dfUEdCVXN1RktNQWVFdkJWamY2LUZvT0ZoNmFQaF9nRjVUZTVINW11MVZWM21ZdE1jOHJqaDFTMmJwYUFrMlRzcHFZT2xoV19jMnJUMjhrUG5RN0N0Sm9SN0R5d093UjFzZmN6ZzlfeFk3dUtQT2l2cWpEd0xQUklRakVGZWxDUQ?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 11:00:00 GMT"
  },
  {
    "id": "CBMizwFBVV95cUxNTzl2WjFYc2w5RlEyckxkenZ1OFo1bGJDdll2LS0zbUkyM2RhSk8zdnVjdzlxdV83RWVqanA4XzRHRndnVVRWVzFIektHM01QbVhUMjNEbl9LQmlwRGFqZVphTWFlNTItZU5TcDFxa2M5MnV2NmtTb1NtUVJlRnBfTkMtSUt5eVgwOERKZHVnY1pFNExZS2plc1Q4UXZrb3FqUmVmZWpkYTlIR3NISnhQMGJwSkwtSGkwNFgwYVpmbzQtaF90SmpNaUNPdE1OZHM",
    "title": "Disney star, Superdrag front man reflect on growing up in Farragut - Knoxville News Sentinel",
    "description": "• Disney star, Superdrag front man reflect on growing up in Farragut - Knoxville News Sentinel\n• Disney star, Superdrag front man reflect on growing up in Farragut  Knoxville News Sentinel...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=529",
    "source": "Knoxville News Sentinel",
    "url": "https://news.google.com/rss/articles/CBMizwFBVV95cUxNTzl2WjFYc2w5RlEyckxkenZ1OFo1bGJDdll2LS0zbUkyM2RhSk8zdnVjdzlxdV83RWVqanA4XzRHRndnVVRWVzFIektHM01QbVhUMjNEbl9LQmlwRGFqZVphTWFlNTItZU5TcDFxa2M5MnV2NmtTb1NtUVJlRnBfTkMtSUt5eVgwOERKZHVnY1pFNExZS2plc1Q4UXZrb3FqUmVmZWpkYTlIR3NISnhQMGJwSkwtSGkwNFgwYVpmbzQtaF90SmpNaUNPdE1OZHM?oc=5",
    "publishedAt": "Wed, 18 Feb 2026 10:01:00 GMT"
  },
  {
    "id": "CBMixwFBVV95cUxOSlRaNGlCNzdOYmNGeWtFc0t6Y3pZQmpMbm04RDlmdjZFSWg3UFNGQ2RnSFRwcUZWTWNmRlRyS3dFWWtwaUFuZkl6d3Q1LVV2QXB0RE9DWE5ZRXdTbWg0Ul9QYUR2YktaSVlZekJTTWNPcUFjOENzYzVUVnc0R05SZDRzdnA4dEVMUVpra19idW1Hajh2MGM1MWRUVnQtZ3MxTC12QlhOOTdpbHc3akU5WU5xcG1TbHdVVDdSbEU0dFBDZ2pTc1Bn0gHbAUFVX3lxTE9zWHBNZzNGNGVEMnZValhCR3lOMUx5QjdFcDdBQjNsbC1hX0dMUjA1UXVIWXJqWXd0eXhDVTRIQTJIUlFwTmZWRjNoTlVjSVU1ZmlsREttWjE2M1prVF9fSDdFQVZHQm0tM3U4RU1jcmVXcmNtOW1wbk5BNjdLZ3lGcjZZUVRxdEFkeW96TFpldlF4RXdrNFJFbWVJX3pPY2E5UTJSVHU0UG85dnBGUjlQeHFNa1BwUzBvdW5CcUpvOWxoZjlaNGVWRUpKTlhuRGthcTNFcEZ6V1hzdw",
    "title": "Foxboro denies entertainment license months before World Cup - Boston 25 News",
    "description": "• Foxboro denies entertainment license months before World Cup - Boston 25 News\n• Foxboro denies entertainment license months before World Cup  Boston 25 News...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=724",
    "source": "Boston 25 News",
    "url": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOSlRaNGlCNzdOYmNGeWtFc0t6Y3pZQmpMbm04RDlmdjZFSWg3UFNGQ2RnSFRwcUZWTWNmRlRyS3dFWWtwaUFuZkl6d3Q1LVV2QXB0RE9DWE5ZRXdTbWg0Ul9QYUR2YktaSVlZekJTTWNPcUFjOENzYzVUVnc0R05SZDRzdnA4dEVMUVpra19idW1Hajh2MGM1MWRUVnQtZ3MxTC12QlhOOTdpbHc3akU5WU5xcG1TbHdVVDdSbEU0dFBDZ2pTc1Bn0gHbAUFVX3lxTE9zWHBNZzNGNGVEMnZValhCR3lOMUx5QjdFcDdBQjNsbC1hX0dMUjA1UXVIWXJqWXd0eXhDVTRIQTJIUlFwTmZWRjNoTlVjSVU1ZmlsREttWjE2M1prVF9fSDdFQVZHQm0tM3U4RU1jcmVXcmNtOW1wbk5BNjdLZ3lGcjZZUVRxdEFkeW96TFpldlF4RXdrNFJFbWVJX3pPY2E5UTJSVHU0UG85dnBGUjlQeHFNa1BwUzBvdW5CcUpvOWxoZjlaNGVWRUpKTlhuRGthcTNFcEZ6V1hzdw?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 04:21:00 GMT"
  },
  {
    "id": "CBMiqAFBVV95cUxNYXI0M1NNQ0JYcnA0cmtveWx0dm5TY21sSFdzQ0hxNTkxbmJFMEU3SFA0V3k1aHdHS3ZpLVctZUkxcUpIM083bDFVYzFhOThFeG9wUjlsc1J5RmtHTnJWTTh0S1VJZC1VOFVwS0ZwaWNrbzQxci1mdUpXWUUzLTlhUkRoNnZXOGVxTFo4aGxla3oyS0RlY1ZjUHZWLUpPd2ZOSjFLSl9CRDY",
    "title": "Live Nation Entertainment Full Year And Fourth Quarter 2025 Results - Live Nation",
    "description": "• Live Nation Entertainment Full Year And Fourth Quarter 2025 Results - Live Nation\n• Live Nation Entertainment Full Year And Fourth Quarter 2025 Results  Live Nation...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=760",
    "source": "Live Nation",
    "url": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNYXI0M1NNQ0JYcnA0cmtveWx0dm5TY21sSFdzQ0hxNTkxbmJFMEU3SFA0V3k1aHdHS3ZpLVctZUkxcUpIM083bDFVYzFhOThFeG9wUjlsc1J5RmtHTnJWTTh0S1VJZC1VOFVwS0ZwaWNrbzQxci1mdUpXWUUzLTlhUkRoNnZXOGVxTFo4aGxla3oyS0RlY1ZjUHZWLUpPd2ZOSjFLSl9CRDY?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 19:53:07 GMT"
  },
  {
    "id": "CBMi0gFBVV95cUxOT2JfcHdqeWowVWs1TFBEWl80YWRVN2owaEJ0c0pjaDYtY1hkaVk3WXZ5TEZGSFVaOXZwSUtMT3M4QmF5dlYta1l6cjV6a3oyNEZHY1AzdlFfVlgtNjQ0bm9FTUZiVWg0enFiUFFhMVp2aC13MlIwSFd6M2NDSTl4akV1M3ZJUGc1a3NlTmFrYzZTYW45UDVrQWppVk1RZ2JsbW42TGlRb0tLT0c1TkNXMkRQZE1uUDdVQWptdTlLUWJGdEdlWWJCeEpTNFZ6amxzT0HSAeYBQVVfeXFMTXlicmNCeVgydGllRU5mU2dndTUwM3cyb1FjdXJhUVptdUJUcUhkcmc2YnlwZklndFNEbVlvZXFGYVlFRDlWUGIxa1B2MXVHNzY4U0pyUDFOX3p2MUtzZVFDSjdzdmVEcmFMZVdEdFBUN0tCbzZIZU1TUWM3OVUydHc5OWZyT3pFNW5SSlZGcTRSTlR5bXF0a21Hd0xRQTE0Ym9RT2JnRk9zQzF0Q0F6c2pUNFdnYnFveFBrREY5YlZSQmxLR0ppbExyMDltSVRJTkg4YUU4R2pOZUtLZWVzU0ZtakZzd0E",
    "title": "Country music world facing possibility that 3 iconic performers could retire in 2026 - PennLive.com",
    "description": "• Country music world facing possibility that 3 iconic performers could retire in 2026 - PennLive.com\n• Country music world facing possibility that 3 iconic performers could retire in 2026  PennLive.com...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?entertainment&sig=406",
    "source": "PennLive.com",
    "url": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxOT2JfcHdqeWowVWs1TFBEWl80YWRVN2owaEJ0c0pjaDYtY1hkaVk3WXZ5TEZGSFVaOXZwSUtMT3M4QmF5dlYta1l6cjV6a3oyNEZHY1AzdlFfVlgtNjQ0bm9FTUZiVWg0enFiUFFhMVp2aC13MlIwSFd6M2NDSTl4akV1M3ZJUGc1a3NlTmFrYzZTYW45UDVrQWppVk1RZ2JsbW42TGlRb0tLT0c1TkNXMkRQZE1uUDdVQWptdTlLUWJGdEdlWWJCeEpTNFZ6amxzT0HSAeYBQVVfeXFMTXlicmNCeVgydGllRU5mU2dndTUwM3cyb1FjdXJhUVptdUJUcUhkcmc2YnlwZklndFNEbVlvZXFGYVlFRDlWUGIxa1B2MXVHNzY4U0pyUDFOX3p2MUtzZVFDSjdzdmVEcmFMZVdEdFBUN0tCbzZIZU1TUWM3OVUydHc5OWZyT3pFNW5SSlZGcTRSTlR5bXF0a21Hd0xRQTE0Ym9RT2JnRk9zQzF0Q0F6c2pUNFdnYnFveFBrREY5YlZSQmxLR0ppbExyMDltSVRJTkg4YUU4R2pOZUtLZWVzU0ZtakZzd0E?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 10:00:00 GMT"
  },
  {
    "id": "CBMiswFBVV95cUxPUVlPNnpSdGZRazVBMlRzT0c0M19pRkdwclRvbW5nb3czbW0tZWhENGZLcGQ3Vk1rdzVDZjZxSEo3VTBfTkpHQkxTZlhETlMzcXI4YzVOMkpxSU1URmFIWk5yZ1ZhMUxkaU5FSTdfejVXTEVMYVBoVVg2UGZhSk12T25pbEVIV05sajRGbEpqQ19oelFlMFZNRS12eDByZE5XSHZrQXRpTVVicmhEQUoyOFNqSQ",
    "title": "Euro-Zone Business Activity Up on German Manufacturing Revival - Bloomberg",
    "description": "• Euro-Zone Business Activity Up on German Manufacturing Revival - Bloomberg\n• Euro-Zone Business Activity Up on German Manufacturing Revival  Bloomberg...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=548",
    "source": "Bloomberg",
    "url": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPUVlPNnpSdGZRazVBMlRzT0c0M19pRkdwclRvbW5nb3czbW0tZWhENGZLcGQ3Vk1rdzVDZjZxSEo3VTBfTkpHQkxTZlhETlMzcXI4YzVOMkpxSU1URmFIWk5yZ1ZhMUxkaU5FSTdfejVXTEVMYVBoVVg2UGZhSk12T25pbEVIV05sajRGbEpqQ19oelFlMFZNRS12eDByZE5XSHZrQXRpTVVicmhEQUoyOFNqSQ?oc=5",
    "publishedAt": "Fri, 20 Feb 2026 09:08:54 GMT"
  },
  {
    "id": "CBMiqgFBVV95cUxNZHU5Zm9tcGhlUUt6dGxqRXQ1dVhjYW9Ba2VoU1g3cGx2cW5GTVFYZVV4b2VxaTlDbk1aMGZaX3BHNUJheW9wVlY2cjhhZjNjYzZMUVBRN2VxLTBoZ2x4NzVGd2xmZVEzYW9KQjB1UnQwTjJWaV9McnVBcE1vVDVDNUp4VWRPNTJBNUtia1JPWERFVGVNR1JVMEtzYUh4cEo0MGdRc0ZmVjJmZw",
    "title": "French Business Activity Held Back by Manufacturing Dip - Bloomberg",
    "description": "• French Business Activity Held Back by Manufacturing Dip - Bloomberg\n• French Business Activity Held Back by Manufacturing Dip  Bloomberg...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=431",
    "source": "Bloomberg",
    "url": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxNZHU5Zm9tcGhlUUt6dGxqRXQ1dVhjYW9Ba2VoU1g3cGx2cW5GTVFYZVV4b2VxaTlDbk1aMGZaX3BHNUJheW9wVlY2cjhhZjNjYzZMUVBRN2VxLTBoZ2x4NzVGd2xmZVEzYW9KQjB1UnQwTjJWaV9McnVBcE1vVDVDNUp4VWRPNTJBNUtia1JPWERFVGVNR1JVMEtzYUh4cEo0MGdRc0ZmVjJmZw?oc=5",
    "publishedAt": "Fri, 20 Feb 2026 08:21:11 GMT"
  },
  {
    "id": "CBMihAFBVV95cUxOTmFUMmxNcks4R2xzdzNraGFnNEpNOWdURG1ZMkwwYnhIWWxrR1RtLTFGSEFwd2pQNUZMYTZIQzhLa044M1dWbWpMRnFEY19jX0kza1VieDVUYnROOXVxdWxkTnplMExHXzdHOGduWGhGd0JUbWc5UHVremJhbHlTd0V2akk",
    "title": "The world’s biggest food company doesn’t want to make ice cream anymore - CNN",
    "description": "• The world’s biggest food company doesn’t want to make ice cream anymore - CNN\n• The world’s biggest food company doesn’t want to make ice cream anymore  CNN...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=225",
    "source": "CNN",
    "url": "https://news.google.com/rss/articles/CBMihAFBVV95cUxOTmFUMmxNcks4R2xzdzNraGFnNEpNOWdURG1ZMkwwYnhIWWxrR1RtLTFGSEFwd2pQNUZMYTZIQzhLa044M1dWbWpMRnFEY19jX0kza1VieDVUYnROOXVxdWxkTnplMExHXzdHOGduWGhGd0JUbWc5UHVremJhbHlTd0V2akk?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 09:58:15 GMT"
  },
  {
    "id": "CBMingFBVV95cUxQYlNrLU5SaGRhUERDNEJ4LWtiTVJzQWZyR3NoaURoUjJ1NkxkV2VESUJsUXU4cWNWM0RBUzBackQ5NGNXLU52bFpVOTR2LUVtNkc3aXV2ZlAycFVLb3BaWTNlQ0J6eGhEYXEya0Y2WVR4RjhJVlE5blc1eTZ6UGZBbnNaLUhVc3RNdVBWTnl1ZVFUemNSV19XQVFJQmZld9IBowFBVV95cUxOdjBUTUhHUklweDNCLVl5UmFmbFFaSERscTVoQ25VVjhzNDRLR3BsbDVKRjI4enZkTi1iWDVRUEZUOEhYaVhobWpqc21nTFZySXpzQTVDMUpPSk5WcVNlTk5ZakFsZ2tjQ29sZ2p5OUxyeFVNYWVxSXVOSEY4bURNNFVUak5YdXBRTXJwbTRCeFhEdmtVbFlRZlpqVlhzODRDbkRZ",
    "title": "Couple quit their jobs to start a proposal planning business in 2010—now it brings in 7 figures a year - CNBC",
    "description": "• Couple quit their jobs to start a proposal planning business in 2010—now it brings in 7 figures a year - CNBC\n• Couple quit their jobs to start a proposal planning business in 2010—now it brings in 7 figures a year  CNBC...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=713",
    "source": "CNBC",
    "url": "https://news.google.com/rss/articles/CBMingFBVV95cUxQYlNrLU5SaGRhUERDNEJ4LWtiTVJzQWZyR3NoaURoUjJ1NkxkV2VESUJsUXU4cWNWM0RBUzBackQ5NGNXLU52bFpVOTR2LUVtNkc3aXV2ZlAycFVLb3BaWTNlQ0J6eGhEYXEya0Y2WVR4RjhJVlE5blc1eTZ6UGZBbnNaLUhVc3RNdVBWTnl1ZVFUemNSV19XQVFJQmZld9IBowFBVV95cUxOdjBUTUhHUklweDNCLVl5UmFmbFFaSERscTVoQ25VVjhzNDRLR3BsbDVKRjI4enZkTi1iWDVRUEZUOEhYaVhobWpqc21nTFZySXpzQTVDMUpPSk5WcVNlTk5ZakFsZ2tjQ29sZ2p5OUxyeFVNYWVxSXVOSEY4bURNNFVUak5YdXBRTXJwbTRCeFhEdmtVbFlRZlpqVlhzODRDbkRZ?oc=5",
    "publishedAt": "Wed, 18 Feb 2026 15:44:10 GMT"
  },
  {
    "id": "CBMisgFBVV95cUxOMTZ4QmlEZVdQOVdpUjNQTDRQaXZYbUxZdnRmbzJhaWphQkZ5UzhHek91WGJFamV6U1FnSk5rS3p0bUZzS1NNQXFmRi13QzA4Nmp5ZDB2OXhrUVB2bldYaHVCUERzSHJYOHRmb1dWQzEwYVZWaUJRcE5leUhyVHI4S1NLUkh1N2NVQlVKMkJOdEtnOEZzbk41eG1jVHZRdVpwSWtlR0wxdXpZVGswdUltS3RR",
    "title": "Sarah McLachlan, 58, says she had to 'eat a lot of humble pie' to repair her relationship with her older daughter - Business Insider",
    "description": "• Sarah McLachlan, 58, says she had to 'eat a lot of humble pie' to repair her relationship with her older daughter - Business Insider\n• Sarah McLachlan, 58, says she had to 'eat a lot of humble pie' to repair her relationship with her older daughter  Business Insider...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=732",
    "source": "Business Insider",
    "url": "https://news.google.com/rss/articles/CBMisgFBVV95cUxOMTZ4QmlEZVdQOVdpUjNQTDRQaXZYbUxZdnRmbzJhaWphQkZ5UzhHek91WGJFamV6U1FnSk5rS3p0bUZzS1NNQXFmRi13QzA4Nmp5ZDB2OXhrUVB2bldYaHVCUERzSHJYOHRmb1dWQzEwYVZWaUJRcE5leUhyVHI4S1NLUkh1N2NVQlVKMkJOdEtnOEZzbk41eG1jVHZRdVpwSWtlR0wxdXpZVGswdUltS3RR?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 05:23:00 GMT"
  },
  {
    "id": "CBMiwgFBVV95cUxPcEw1allvM25uWktmQTBkTGFsTXNiZ3JoN0t4ckJLZm0ta3IxdURVX1pvNVRhR3dpSE5uWjk4VzVTb25vRnkyWlh0Mmp4RUkwUDhnSDZUWUtrVlR1MFB1eFFaQ0t6ZWZ0RWNxckJtM096UlVVX0pOLVJhcTdYM05nS0ttTVctbHZwZ0pUV1h0b3RFTXU3dDh4YVFPZVRHRFZhUm9wNU5zT05CUHM3YVBpMVBnRmhDR3NGeV83WFA5TnUtZ9IBxwFBVV95cUxQUHlDQWdobVlvdm51U1hCYi1LSkFDeTZuNHFaTERRd0RnZGxqX29CX2xSOTRFbzcxTkNaT1FxcEgxd3FZcWpDU1UyZ1hJS2JOTnp5bE1EQnI0MXgxSHpHVWN1eVlkdVl3RW1lQWJwSDhWYnk5ZFJhcFVBX0Vna2c0c3R1X2s3bFZ2ajU0SW5GVXZDUExBbDhsWEVmdDlHQXN1SGU0dHlkWHRDV1JxemJEODhiNmhhWUsxTDJwLXBCdjNlUjJIMnhN",
    "title": "Silicon Valley engineers charged with stealing Google trade secrets and transferring them to Iran - Fox Business",
    "description": "• Silicon Valley engineers charged with stealing Google trade secrets and transferring them to Iran - Fox Business\n• Silicon Valley engineers charged with stealing Google trade secrets and transferring them to Iran  Fox Business...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=141",
    "source": "Fox Business",
    "url": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPcEw1allvM25uWktmQTBkTGFsTXNiZ3JoN0t4ckJLZm0ta3IxdURVX1pvNVRhR3dpSE5uWjk4VzVTb25vRnkyWlh0Mmp4RUkwUDhnSDZUWUtrVlR1MFB1eFFaQ0t6ZWZ0RWNxckJtM096UlVVX0pOLVJhcTdYM05nS0ttTVctbHZwZ0pUV1h0b3RFTXU3dDh4YVFPZVRHRFZhUm9wNU5zT05CUHM3YVBpMVBnRmhDR3NGeV83WFA5TnUtZ9IBxwFBVV95cUxQUHlDQWdobVlvdm51U1hCYi1LSkFDeTZuNHFaTERRd0RnZGxqX29CX2xSOTRFbzcxTkNaT1FxcEgxd3FZcWpDU1UyZ1hJS2JOTnp5bE1EQnI0MXgxSHpHVWN1eVlkdVl3RW1lQWJwSDhWYnk5ZFJhcFVBX0Vna2c0c3R1X2s3bFZ2ajU0SW5GVXZDUExBbDhsWEVmdDlHQXN1SGU0dHlkWHRDV1JxemJEODhiNmhhWUsxTDJwLXBCdjNlUjJIMnhN?oc=5",
    "publishedAt": "Fri, 20 Feb 2026 06:31:00 GMT"
  },
  {
    "id": "CBMivgFBVV95cUxOcDh0RGNScEs2MjYzajF3Q3gwZm5pVmlKbjlyeC1hUVhETnpiSTRFb3IyR1lWbUkwRmJweXMzdFRkS01ER21vU0ZZS2ZuelFTWXZBalVjTEtXNFBNdVN2eUdvR1hYQ09oOVJuaVhNZVUzSnRlSldVUkZoa1ZobHNrdXZ0SF9hUXQxalZiaWhQMDNPa29lMW9qMkYtbmM2TUhhZ0tjb3kxSVN2OEdfdFdUMXJYcnRRRXpSNmdhUGZB",
    "title": "Copilot coding agent model picker for Copilot Business and Enterprise - The GitHub Blog",
    "description": "• Copilot coding agent model picker for Copilot Business and Enterprise - The GitHub Blog\n• Copilot coding agent model picker for Copilot Business and Enterprise  The GitHub Blog...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=701",
    "source": "The GitHub Blog",
    "url": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOcDh0RGNScEs2MjYzajF3Q3gwZm5pVmlKbjlyeC1hUVhETnpiSTRFb3IyR1lWbUkwRmJweXMzdFRkS01ER21vU0ZZS2ZuelFTWXZBalVjTEtXNFBNdVN2eUdvR1hYQ09oOVJuaVhNZVUzSnRlSldVUkZoa1ZobHNrdXZ0SF9hUXQxalZiaWhQMDNPa29lMW9qMkYtbmM2TUhhZ0tjb3kxSVN2OEdfdFdUMXJYcnRRRXpSNmdhUGZB?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 19:55:01 GMT"
  },
  {
    "id": "CBMirwFBVV95cUxOdEllYjdfV2xPZDBFN3JrMzdFeF9lME5LMTZkUXZWUTBWSjZzY2l1bnNuVW1CZHlqRllIRTZSRFZjVGM5c1VDTmpOMG1ZTmZ0bVNObExaSHN1QVBUZEQ1MWNUcW5CT1FRaDk1QkJmOUhxNFl0Zjh1WEIzNmlaUnV2ZVVMM0pWU20wUmF5V05QbUlsR3kyOFlEQ2JudUM1RmF3bFF0ankyNW9pUjNaemhj",
    "title": "Dodgers exec Lon Rosen becomes Lakers' president of business ops - ESPN",
    "description": "• Dodgers exec Lon Rosen becomes Lakers' president of business ops - ESPN\n• Dodgers exec Lon Rosen becomes Lakers' president of business ops  ESPN...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=811",
    "source": "ESPN",
    "url": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOdEllYjdfV2xPZDBFN3JrMzdFeF9lME5LMTZkUXZWUTBWSjZzY2l1bnNuVW1CZHlqRllIRTZSRFZjVGM5c1VDTmpOMG1ZTmZ0bVNObExaSHN1QVBUZEQ1MWNUcW5CT1FRaDk1QkJmOUhxNFl0Zjh1WEIzNmlaUnV2ZVVMM0pWU20wUmF5V05QbUlsR3kyOFlEQ2JudUM1RmF3bFF0ankyNW9pUjNaemhj?oc=5",
    "publishedAt": "Thu, 19 Feb 2026 22:21:00 GMT"
  },
  {
    "id": "CBMiuAFBVV95cUxNdXV6eUcxbzhvTWlHQnBLMVBoc2VIRW1GV0M2NTNfdUJkRlpLdUliTjRueTV5dXYyOWFpTDBZbGtQMVhQdk1qWHVWUUd6ejFJeVBLNlNIaEc2STZ5QzBWSmQ1bUh3X1Nobk14MEVVQkZtMGlDaU0wcFlDR3FVTGZVOC1pMnljU1YyUFZCOS1WN2ZiT2ZLZmtINWlzOTJOZVdReWVsNmo0TVc3WlFEZVQyYzFCR0RqS3VR0gG-AUFVX3lxTE1LdzNTa2lNX042ckZoNW1HNVF1WWJWekdzVHNGQ2hJcWdBUWozdXc4NTRzdDZzeXNJMzk2M1VrV1BOLVFYaVBPZXV3aFlHMFVkNndyVGNLb2pSV2pYQVNoZjdmVXlMYWJFazcwNi1wMFdhZmt3eVF6SDUzb2kxVngzdDhkdm5hbkZjeDVLeU5ocGpLSGNMNkdacTZzQVRTQ0ExQVowUEpMTHh5WWdUc0UyNWhjTk9GWnNHdVhSSHc",
    "title": "Married L.A. County couple charged with operating large-scale sex services business - KTLA",
    "description": "• Married L.A. County couple charged with operating large-scale sex services business - KTLA\n• Married L.A. County couple charged with operating large-scale sex services business  KTLA...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=191",
    "source": "KTLA",
    "url": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxNdXV6eUcxbzhvTWlHQnBLMVBoc2VIRW1GV0M2NTNfdUJkRlpLdUliTjRueTV5dXYyOWFpTDBZbGtQMVhQdk1qWHVWUUd6ejFJeVBLNlNIaEc2STZ5QzBWSmQ1bUh3X1Nobk14MEVVQkZtMGlDaU0wcFlDR3FVTGZVOC1pMnljU1YyUFZCOS1WN2ZiT2ZLZmtINWlzOTJOZVdReWVsNmo0TVc3WlFEZVQyYzFCR0RqS3VR0gG-AUFVX3lxTE1LdzNTa2lNX042ckZoNW1HNVF1WWJWekdzVHNGQ2hJcWdBUWozdXc4NTRzdDZzeXNJMzk2M1VrV1BOLVFYaVBPZXV3aFlHMFVkNndyVGNLb2pSV2pYQVNoZjdmVXlMYWJFazcwNi1wMFdhZmt3eVF6SDUzb2kxVngzdDhkdm5hbkZjeDVLeU5ocGpLSGNMNkdacTZzQVRTQ0ExQVowUEpMTHh5WWdUc0UyNWhjTk9GWnNHdVhSSHc?oc=5",
    "publishedAt": "Fri, 20 Feb 2026 04:06:25 GMT"
  },
  {
    "id": "CBMicEFVX3lxTE1lNllZTWduLW5ja1RuXzhlbXZ4TEtEVGZIYWNybmZhZXpWRW9LWFFLY3B3VVRZVGc1TjRLekhMem5vX3pWUGRpb1VMNG1HQ3NWSGpOV1Q0ZkJ4OVMtU08ydFNoWFpVejhySTA0b3kxNk0",
    "title": "The ANC’s sudden embrace of South African business - Financial Times",
    "description": "• The ANC’s sudden embrace of South African business - Financial Times\n• The ANC’s sudden embrace of South African business  Financial Times...\n• Read more in the full article below.",
    "imageUrl": "https://source.unsplash.com/featured/1200x800?business&sig=508",
    "source": "Financial Times",
    "url": "https://news.google.com/rss/articles/CBMicEFVX3lxTE1lNllZTWduLW5ja1RuXzhlbXZ4TEtEVGZIYWNybmZhZXpWRW9LWFFLY3B3VVRZVGc1TjRLekhMem5vX3pWUGRpb1VMNG1HQ3NWSGpOV1Q0ZkJ4OVMtU08ydFNoWFpVejhySTA0b3kxNk0?oc=5",
    "publishedAt": "Fri, 20 Feb 2026 05:00:31 GMT"
  }
];
