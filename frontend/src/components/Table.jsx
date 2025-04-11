import React from 'react';

const Table = ({ 
  data, 
  columns, 
  onRowClick, 
  responsiveBreakpoint = '768px',
  className = '',
  striped = true,
  hover = true
}) => {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < parseInt(responsiveBreakpoint)
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < parseInt(responsiveBreakpoint));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsiveBreakpoint]);

  if (isMobile) {
    return (
      <div className={`space-y-4 ${className}`}> {/* Más espacio entre filas */}
        {data.map((item, index) => (
          <div 
            key={index}
            onClick={() => onRowClick && onRowClick(item)}
            className={`border rounded-lg p-6 shadow-sm ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''} ${
              striped && index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}
          >
            {columns.map((column) => (
              column.key !== 'actions' && (
                <div key={column.key} className="mb-4 last:mb-0"> {/* Más espacio entre items */}
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {column.label}
                  </div>
                  <div className={`mt-1 ${column.className || 'text-gray-900'}`}>
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-lg shadow-sm border ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => onRowClick && onRowClick(item)}
              className={`${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''} ${
                striped && index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap ${column.className || 'text-sm text-gray-900'}`}
                >
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;