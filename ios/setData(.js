setData(
    data.concat(
      results.data
        .filter((x) => array.includes(x.country))
        .filter(
          (x) =>
            x.car_model_year >= start_year &&
            x.car_model_year <= end_year,
        )
        .filter((x) => x.gender.toLowerCase() === gender.toLowerCase())
        .filter((x) =>
          ['Green', 'Violet', 'Yellow', 'Blue'].includes(x.car_color),
        ),
    ),



    results.data
            .filter((x) => countries.includes(x.country))
            .filter(
              (x) =>
                x.car_model_year >= start_year && x.car_model_year <= end_year,
            )
            .filter((x) => x.gender.toLowerCase() === gender.toLowerCase())
            .filter((x) => colours.includes(x.car_color)),
        ]);