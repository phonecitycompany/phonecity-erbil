import React, { useContext } from 'react';

const TableContext = React.createContext();

function Table({ columns, children }) {
    return (
        <TableContext.Provider value={{ columns }}>
            <div className=" rounded-lg  border border-gray-200 shadow-md">
                {children}
            </div>
        </TableContext.Provider>
    );
}

function Header({ children }) {
    const { columns } = useContext(TableContext);
    return (
        <div
            className={`grid ${columns} divide-x rounded-t-lg border-b border-gray-100 bg-white p-6 text-center text-lg font-semibold uppercase tracking-wider text-dark-grey`}
            role="row"
        >
            {children}
        </div>
    );
}

function Row({ children }) {
    const { columns } = useContext(TableContext);
    return (
        <div
            className={`grid ${columns} divide-x  px-6 py-3  text-center`}
            role="row"
        >
            {children}
        </div>
    );
}

function Body({ data, render }) {
    return (
        <div className="table-body my-1">
            {data.length ? (
                data.map()
            ) : (
                <p className="text-center text-sm font-medium text-gray-500">
                    No data to show at the moment
                </p>
            )}
        </div>
    );
}

function Footer({ children }) {
    return (
        <div className=" flex justify-center rounded-b-lg bg-gray-50 px-8 py-6">
            {children}
        </div>
    );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
