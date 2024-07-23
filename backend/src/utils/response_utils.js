export const responseSuccess = (response, result) => {
    const data = {
        message: "Success"
    };
    
    if (result) {
        data.result = result;
    }
    
    response.status(200).json({
        status: 200,
        data: data
    });
};

export const responseBadInput = (response, result) => {
    const data = {
        message: "Bad input"
    };
    
    if (result) {
        data.result = result;
    }
    
    response.status(400).json({
        status: 400,
        data: data
    });
};

export const responseUnauthorized = (response) => {
    response.status(401).json({
        status: 401,
        data: {
            message: "You are currently not logged in"
        }
    });
};

export const responseForbidden = (response) => {
    response.status(403).json({
        status: 403,
        data: {
            message: "You are not allowed to do that"
        }
    });
};

export const responseInternalError = (response, result) => {
    const data = {
        message: "Internal server error"
    };
    
    if (result) {
        data.result = result;
    }
    
    response.status(500).json({
        status: 500,
        data: data
    });
};

export const responseOnline = (response) => {
    responseSuccess(response, "API online. Visit /api-docs for endpoint documentation.");
};