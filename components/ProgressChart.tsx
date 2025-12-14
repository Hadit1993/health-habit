import { Colors } from "@/constants/theme";
import { ProgressChartProps } from "@/propTypes";
import styles from "@/styles/ProgressChartStyle";
import { JSX } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function ProgressChart({
  data,
  title,
  type = "line",
}: ProgressChartProps) {
  const chartConfig = {
    backgroundColor: Colors.surface,
    backgroundGradientFrom: Colors.surface,
    backgroundGradientTo: Colors.surfaceLight,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (_opacity = 1) => Colors.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.primary,
    },
  };

  const renderLineChart = (): JSX.Element => (
    <LineChart
      data={{
        labels: data.labels,
        datasets: data.datasets,
      }}
      width={screenWidth - 48}
      height={220}
      chartConfig={chartConfig}
      bezier
      style={styles.chart}
    />
  );

  const renderPieChart = (): JSX.Element => {
    const pieData = data.datasets[0].data.map((value, index) => ({
      name: data.labels[index],
      population: value,
      color: Colors.chartColors[index % Colors.chartColors.length],
      legendFontColor: Colors.text,
      legendFontSize: 12,
    }));

    return (
      <PieChart
        data={pieData}
        width={screenWidth - 48}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {type === "line" ? renderLineChart() : renderPieChart()}
    </View>
  );
}
