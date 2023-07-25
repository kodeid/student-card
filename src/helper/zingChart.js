export const RADAR_CHART_CONFIG = () => {
  return {
    type: 'radar',
    globals: {
      //   fontFamily: 'Poppins',
    },
    backgroundColor: 'transparent',
    plot: {
      aspect: 'area',
      animation: {
        effect: 3,
        sequence: 1,
        speed: 700,
      },
    },
    scaleV: {
      visible: true,
      values: '0:100:10',
      format: '%v%',
      guide: {
        borderColor: 'red',
      },
    },
    scaleK: {
      values: '0:7:1',
      labels: [],
      guide: {
        alpha: 0.3,
        backgroundColor: '#e5e7eb #d1d5db',
        lineColor: 'white',
        lineStyle: 'solid',
      },
      item: {
        //To style your scale labels.
        'font-color': 'orange',
        'font-size': 8,
        'font-weight': 'bold',
        'font-style': 'italic',
      },
      refLine: {
        lineColor: '#c10000',
      },
      tick: {
        lineColor: 'orange',
        lineWidth: '2px',
        lineStyle: 'dotted',
        size: 20,
      },
    },
    series: [],
  };
};

export const NESTED_PIE_CHART_CONFIG = () => {
  return {
    type: 'pie',
    plotarea: {
      margin: '40',
    },
    scale: {
      sizeFactor: 1,
    },
    backgroundColor: 'transparent',
    margin: 'auto',
    plot: {
      valueBox: {
        visible: true,
      },
      refAngle: 270,
      angleStart: 270,
      detach: false,
      slice: '100%',
      totals: [100],
      animation: {
        speed: 1000,
        effect: 2,
        method: 0,
      },
      hoverState: {
        visible: false,
      },
    },
    series: [],
    tooltip: {
      x: 190,
      y: 190,
      width: 120,
      fontSize: 19,
      padding: 30,
      anchor: 'c',
      text: "%plot-text<br><span style='font-size:31px;font-weight:bold;color:%color;'>%node-percent-value%</span>",
      color: '#333',
      align: 'left',
      borderWidth: 0,
      backgroundColor: 'none',
    },
    shapes: [],
  };
};