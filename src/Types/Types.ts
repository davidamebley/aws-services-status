export type Continent = {
    type: string; 
    geometry: 
        { 
            type: string; 
            coordinates: number[][][][]; 
        }; 
    properties: { 
        continent: string;
        color?: string;
    }; 
}

export type Location = {
    name: string;
    coordinates: number[];
}

export type AWSService = {
    name: string;
    state: string;
    updated: string;
    aws_region: string;
    coordinates?: number[];
    color?: string
}

export type ServiceLocation = {
    name: string;
    state: string;
    updated: string;
    region: string;
    coordinates?: [];
    color?: string
}

// module.exports = {Map} 