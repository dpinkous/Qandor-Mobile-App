import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

export const ViewHeader = (props: any) => (
	<Text style={props.bold ? styles.headerStyleBold : styles.headerStyleRegular}>{props.title}</Text>
)

const styles = StyleSheet.create({
	headerStyleBold: {
		fontFamily: 'Montserrat-Bold',
		textAlign: 'center',
	},
	headerStyleRegular: {
		fontFamily: 'Montserrat-Regular',
		textAlign: 'center',
		fontWeight: 'normal',
	},
});
