import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Title = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>TIC TAC TOE</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    title: {
        color: '#007580',
        fontSize: 35,
        fontWeight: 'bold'
    }
})

export default Title