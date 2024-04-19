// Import necessary libraries
import React from 'react';
import { Stage, Layer, Circle, Arrow, Text } from 'react-konva';

// Mock data for areas with names and number of people
const areasData = [
  { id: 1, name: 'Area 1', count: 10 },
  { id: 2, name: 'Area 2', count: 5 },
  { id: 3, name: 'Area 3', count: 15 },
  { id: 4, name: 'Area 4', count: 8 },
];

// Define the component
const CircleGraph = ({ areas }) => {
  // Function to generate a random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Assign random x and y coordinates to each area
  const areasWithCoords = areas.map((area) => ({
    ...area,
    x: getRandomNumber(50, window.innerWidth - 50),
    y: getRandomNumber(50, window.innerHeight - 50)
  }));

  // Get the total count of people
  const totalCount = areas.reduce((acc, area) => acc + area.count, 0);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* Render circles for each area */}
        {areasWithCoords.map((area) => (
          <React.Fragment key={area.id}>
            {/* Circle */}
            <Circle
              x={area.x}
              y={area.y}
              radius={50}
              fill={`rgba(0, ${255 * (1 - (area.count / totalCount))}, 0, 1)`} // Color based on count
              stroke='black'
              strokeWidth={2}
            />
            {/* Text displaying area name */}
            <Text
              x={area.x - 25}
              y={area.y}
              text={area.name}
              fontSize={14}
              fill='black'
            />
          </React.Fragment>
        ))}

        {/* Render arrows connecting circles to represent flow */}
        {areasWithCoords.map((sourceArea) => {
          if (!sourceArea) return null; // Skip null or undefined areas
          const maxFlow = Math.max(...areasWithCoords.map(area => area.count));
          return areasWithCoords.map((targetArea) => {
            if (!targetArea || sourceArea.id === targetArea.id) return null; // Skip null or undefined areas and self-connections
            // Calculate the thickness of the arrow based on the flow
            const strokeWidth = (sourceArea.count / maxFlow) * 5;
            return (
              <Arrow
                key={`${sourceArea.id}-${targetArea.id}`}
                points={[
                  sourceArea.x + 50,
                  sourceArea.y,
                  targetArea.x - 50,
                  targetArea.y
                ]}
                pointerLength={10}
                pointerWidth={10}
                fill='black'
                stroke='black'
                strokeWidth={strokeWidth}
              />
            );
          });
        })}
      </Layer>
    </Stage>
  );
};

// Main App component
const App = () => {
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <CircleGraph areas={areasData} />
    </div>
  );
};

export default App;
