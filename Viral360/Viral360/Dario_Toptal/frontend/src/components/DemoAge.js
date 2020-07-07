import React from 'react';

function DemoMap() {
  return (
    <div className="graph">
  <svg className="gradient-defs" style={{height: '0'}}>
    <defs>
      <linearGradient
        id="age-card-container-gradient-1"
        x1="0%"
        y1="100%"
        x2="0%"
        y2="0%"
      >
        <stop
          offset="0%"
          style={{ stopColor: "rgb(29, 197, 233)", stopOpacity: 1 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "rgb(30, 232, 183)", stopOpacity: 1 }}
        />
      </linearGradient>
      <linearGradient
        id="age-card-container-gradient-2"
        x1="0%"
        y1="100%"
        x2="0%"
        y2="0%"
      >
        <stop
          offset="0%"
          style={{ stopColor: "rgb(137, 158, 212)", stopOpacity: 1 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: "rgb(94, 110, 253)", stopOpacity: 1 }}
        />
      </linearGradient>
    </defs>
  </svg>
  <div
    className="VictoryContainer"
    style={{
      height: "100%",
      width: "100%",
      userSelect: "none",
      pointerEvents: "none",
      touchAction: "none",
      position: "relative"
    }}
  >
    <svg
      width={450}
      height={220}
      role="img"
      aria-labelledby="victory-container-7-title victory-container-7-desc"
      viewBox="0 100 450 200"
      style={{ pointerEvents: "all", width: "100%", height: "100%" }}
    >
      <g role="presentation">
        <path
          d="M 40.32804943578721, 270
A 4 4 0 0 1, 36.32804943578721, 266
L 36.32804943578721, 80.77900513614298
A 4 4 0 0 1, 40.32804943578721, 76.77900513614298
L 39.32804943578721, 76.77900513614298
A 4 4 0 0 1, 43.32804943578721, 80.77900513614298
L 43.32804943578721, 266
A 4 4 0 0 1, 39.32804943578721, 270
z"
          role="presentation"
          shapeRendering="auto"
          style={{
            fill: 'url("#age-card-container-gradient-1")',
            stroke: 'url("#age-card-container-gradient-1")',
            padding: 8,
            strokeWidth: 0
          }}
        />
        <path
          d="M 114.39682966147232, 270
A 4 4 0 0 1, 110.39682966147232, 266
L 110.39682966147232, 33.890710382513646
A 4 4 0 0 1, 114.39682966147232, 29.890710382513646
L 113.39682966147232, 29.890710382513646
A 4 4 0 0 1, 117.39682966147232, 33.890710382513646
L 117.39682966147232, 266
A 4 4 0 0 1, 113.39682966147232, 270
z"
          role="presentation"
          shapeRendering="auto"
          style={{
            fill: 'url("#age-card-container-gradient-2")',
            stroke: 'url("#age-card-container-gradient-2")',
            padding: 8,
            strokeWidth: 0
          }}
        />
        <path
          d="M 188.46560988715746, 270
A 4 4 0 0 1, 184.46560988715746, 266
L 184.46560988715746, 130.24357982129035
A 4 4 0 0 1, 188.46560988715746, 126.24357982129035
L 187.46560988715746, 126.24357982129035
A 4 4 0 0 1, 191.46560988715746, 130.24357982129035
L 191.46560988715746, 266
A 4 4 0 0 1, 187.46560988715746, 270
z"
          role="presentation"
          shapeRendering="auto"
          style={{
            fill: 'url("#age-card-container-gradient-1")',
            stroke: 'url("#age-card-container-gradient-1")',
            padding: 8,
            strokeWidth: 0
          }}
        />
        <path
          d="M 262.5343901128425, 270
A 4 4 0 0 1, 258.5343901128425, 266
L 258.5343901128425, 80.26374914983933
A 4 4 0 0 1, 262.5343901128425, 76.26374914983933
L 261.5343901128425, 76.26374914983933
A 4 4 0 0 1, 265.5343901128425, 80.26374914983933
L 265.5343901128425, 266
A 4 4 0 0 1, 261.5343901128425, 270
z"
          role="presentation"
          shapeRendering="auto"
          style={{
            fill: 'url("#age-card-container-gradient-2")',
            stroke: 'url("#age-card-container-gradient-2")',
            padding: 8,
            strokeWidth: 0
          }}
        />
        <path
          d="M 336.60317033852766, 270
A 4 4 0 0 1, 332.60317033852766, 266
L 332.60317033852766, 50.378901944229455
A 4 4 0 0 1, 336.60317033852766, 46.378901944229455
L 335.60317033852766, 46.378901944229455
A 4 4 0 0 1, 339.60317033852766, 50.378901944229455
L 339.60317033852766, 266
A 4 4 0 0 1, 335.60317033852766, 270
z"
          role="presentation"
          shapeRendering="auto"
          style={{
            fill: 'url("#age-card-container-gradient-1")',
            stroke: 'url("#age-card-container-gradient-1")',
            padding: 8,
            strokeWidth: 0
          }}
        />
        <path
          d="M 410.6719505642128, 270
A 4 4 0 0 1, 406.6719505642128, 266
L 406.6719505642128, 138.48767560214827
A 4 4 0 0 1, 410.6719505642128, 134.48767560214827
L 409.6719505642128, 134.48767560214827
A 4 4 0 0 1, 413.6719505642128, 138.48767560214827
L 413.6719505642128, 266
A 4 4 0 0 1, 409.6719505642128, 270
z"
          role="presentation"
          shapeRendering="auto"
          style={{
            fill: 'url("#age-card-container-gradient-2")',
            stroke: 'url("#age-card-container-gradient-2")',
            padding: 8,
            strokeWidth: 0
          }}
        />
      </g>
      <g role="presentation">
        <line
          x1={20}
          x2={430}
          y1={270}
          y2={270}
          role="presentation"
          shapeRendering="auto"
          vectorEffect="non-scaling-stroke"
          style={{
            stroke: "rgb(37, 37, 37)",
            strokeWidth: 0,
            fill: "transparent",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }}
        />
        <g role="presentation">
          <line
            x1="39.82804943578721"
            x2="39.82804943578721"
            y1={270}
            y2={10}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "none", fill: "none", pointerEvents: "painted" }}
          />
          <line
            x1="39.82804943578721"
            x2="39.82804943578721"
            y1={270}
            y2={271}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "transparent", fill: "transparent", size: 1 }}
          />
          <text x="39.82804943578721" dx={0} y={281} dy="13.68">
            <tspan
              x="39.82804943578721"
              dx={0}
              textAnchor="middle"
              style={{
                fill: "rgb(189, 188, 191)",
                fontSize: 16,
                fontWeight: 100,
                fontFamily:
                  '"Gill Sans", "Gill Sans MT", Seravek, "Trebuchet MS", sans-serif',
                letterSpacing: "normal",
                padding: 10,
                stroke: "transparent"
              }}
            >
              &lt;20
            </tspan>
          </text>
        </g>
        <g role="presentation">
          <line
            x1="113.89682966147232"
            x2="113.89682966147232"
            y1={270}
            y2={10}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "none", fill: "none", pointerEvents: "painted" }}
          />
          <line
            x1="113.89682966147232"
            x2="113.89682966147232"
            y1={270}
            y2={271}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "transparent", fill: "transparent", size: 1 }}
          />
          <text x="113.89682966147232" dx={0} y={281} dy="13.68">
            <tspan
              x="113.89682966147232"
              dx={0}
              textAnchor="middle"
              style={{
                fill: "rgb(189, 188, 191)",
                fontSize: 16,
                fontWeight: 100,
                fontFamily:
                  '"Gill Sans", "Gill Sans MT", Seravek, "Trebuchet MS", sans-serif',
                letterSpacing: "normal",
                padding: 10,
                stroke: "transparent"
              }}
            >
              30
            </tspan>
          </text>
        </g>
        <g role="presentation">
          <line
            x1="187.96560988715746"
            x2="187.96560988715746"
            y1={270}
            y2={10}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "none", fill: "none", pointerEvents: "painted" }}
          />
          <line
            x1="187.96560988715746"
            x2="187.96560988715746"
            y1={270}
            y2={271}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "transparent", fill: "transparent", size: 1 }}
          />
          <text x="187.96560988715746" dx={0} y={281} dy="13.68">
            <tspan
              x="187.96560988715746"
              dx={0}
              textAnchor="middle"
              style={{
                fill: "rgb(189, 188, 191)",
                fontSize: 16,
                fontWeight: 100,
                fontFamily:
                  '"Gill Sans", "Gill Sans MT", Seravek, "Trebuchet MS", sans-serif',
                letterSpacing: "normal",
                padding: 10,
                stroke: "transparent"
              }}
            >
              40
            </tspan>
          </text>
        </g>
        <g role="presentation">
          <line
            x1="262.0343901128425"
            x2="262.0343901128425"
            y1={270}
            y2={10}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "none", fill: "none", pointerEvents: "painted" }}
          />
          <line
            x1="262.0343901128425"
            x2="262.0343901128425"
            y1={270}
            y2={271}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "transparent", fill: "transparent", size: 1 }}
          />
          <text x="262.0343901128425" dx={0} y={281} dy="13.68">
            <tspan
              x="262.0343901128425"
              dx={0}
              textAnchor="middle"
              style={{
                fill: "rgb(189, 188, 191)",
                fontSize: 16,
                fontWeight: 100,
                fontFamily:
                  '"Gill Sans", "Gill Sans MT", Seravek, "Trebuchet MS", sans-serif',
                letterSpacing: "normal",
                padding: 10,
                stroke: "transparent"
              }}
            >
              50
            </tspan>
          </text>
        </g>
        <g role="presentation">
          <line
            x1="336.10317033852766"
            x2="336.10317033852766"
            y1={270}
            y2={10}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "none", fill: "none", pointerEvents: "painted" }}
          />
          <line
            x1="336.10317033852766"
            x2="336.10317033852766"
            y1={270}
            y2={271}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "transparent", fill: "transparent", size: 1 }}
          />
          <text x="336.10317033852766" dx={0} y={281} dy="13.68">
            <tspan
              x="336.10317033852766"
              dx={0}
              textAnchor="middle"
              style={{
                fill: "rgb(189, 188, 191)",
                fontSize: 16,
                fontWeight: 100,
                fontFamily:
                  '"Gill Sans", "Gill Sans MT", Seravek, "Trebuchet MS", sans-serif',
                letterSpacing: "normal",
                padding: 10,
                stroke: "transparent"
              }}
            >
              60
            </tspan>
          </text>
        </g>
        <g role="presentation">
          <line
            x1="410.1719505642128"
            x2="410.1719505642128"
            y1={270}
            y2={10}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "none", fill: "none", pointerEvents: "painted" }}
          />
          <line
            x1="410.1719505642128"
            x2="410.1719505642128"
            y1={270}
            y2={271}
            role="presentation"
            shapeRendering="auto"
            vectorEffect="non-scaling-stroke"
            style={{ stroke: "transparent", fill: "transparent", size: 1 }}
          />
          <text x="410.1719505642128" dx={0} y={281} dy="13.68">
            <tspan
              x="410.1719505642128"
              dx={0}
              textAnchor="middle"
              style={{
                fill: "rgb(189, 188, 191)",
                fontSize: 16,
                fontWeight: 100,
                fontFamily:
                  '"Gill Sans", "Gill Sans MT", Seravek, "Trebuchet MS", sans-serif',
                letterSpacing: "normal",
                padding: 10,
                stroke: "transparent"
              }}
            >
              &gt;70
            </tspan>
          </text>
        </g>
      </g>
    </svg>
    <div
      style={{
        zIndex: 99,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
    >
      <svg
        width={450}
        height={300}
        viewBox="0 0 450 300"
        style={{ overflow: "visible", width: "100%", height: "100%" }}
      />
    </div>
  </div>
</div>


  );
}

export default React.memo(DemoMap);
