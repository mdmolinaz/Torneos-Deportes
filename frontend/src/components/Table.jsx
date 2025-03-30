import React from 'react';

const Table = ({ 
  data, 
  columns, 
  onRowClick, 
  responsiveBreakpoint = '768px',
  className = '' 
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
      <div className={`space-y-2 ${className}`}>
        {data.map((item, index) => (
          <div 
            key={index}
            onClick={() => onRowClick && onRowClick(item)}
            className={`border rounded-lg p-4 ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
          >
            {columns.map((column) => (
              column.key !== 'actions' && (
                <div key={column.key} className="mb-2 last:mb-0">
                  <div className="text-sm font-medium text-gray-500">
                    {column.label}
                  </div>
                  <div className={column.className}>
                    {item[column.key]}
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
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
              >
                {item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;