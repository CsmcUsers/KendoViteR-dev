import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

function Home() {
    const todos = [
        { id: 1, task: '完成專案報告', completed: false },
        { id: 2, task: '回覆客戶郵件', completed: true },
        { id: 3, task: '準備會議資料', completed: false },
    ];

    const announcements = [
        { id: 1, title: '系統維護通知', date: '2024-01-15', content: '系統將於本週末進行維護' },
        { id: 2, title: '新功能上線', date: '2024-01-10', content: '新增報表功能已正式上線' },
    ];

    const systemStatus = [
        { service: '資料庫', status: '正常', color: 'bg-green-500' },
        { service: 'API服務', status: '正常', color: 'bg-green-500' },
        { service: '檔案系統', status: '警告', color: 'bg-yellow-500' },
    ];

    const approvalList = [
        { id: 1, title: '請假申請', applicant: '張小明', date: '2024-01-15', status: '待簽核' },
        { id: 2, title: '採購申請', applicant: '李小華', date: '2024-01-14', status: '待簽核' },
        { id: 3, title: '加班申請', applicant: '王小美', date: '2024-01-13', status: '待簽核' },
    ];

    return (
        <div className='k-card-list p-6 space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* 代辦事項 */}
                <Card>
                    <CardHeader>
                        <CardTitle>📋 代辦事項</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className='space-y-3'>
                            {todos.map((todo) => (
                                <div key={todo.id} className='flex items-center gap-3'>
                                    <input type='checkbox' checked={todo.completed} className='w-4 h-4' />
                                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                                        {todo.task}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* 公佈欄 */}
                <Card>
                    <CardHeader>
                        <CardTitle>📢 公佈欄</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className='space-y-4'>
                            {announcements.map((item) => (
                                <div key={item.id} className='border-b pb-3'>
                                    <h3 className='font-semibold'>{item.title}</h3>
                                    <p className='text-sm text-gray-600'>{item.date}</p>
                                    <p className='text-sm'>{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* 系統狀態 */}
                <Card className='mt-4'>
                    <CardHeader>
                        <CardTitle>⚡ 系統狀態</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className='space-y-3'>
                            {systemStatus.map((item, index) => (
                                <div key={index} className='flex justify-between items-center py-4'>
                                    <span>{item.service}</span>
                                    <span className={`px-2 py-1 rounded text-white text-sm ${item.color}`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* 待簽核清單 */}
            <Card>
                <CardHeader>
                    <CardTitle>📝 待簽核清單 </CardTitle>
                </CardHeader>
                <CardBody>
                    <Grid data={approvalList}>
                        <GridColumn field='title' title='申請項目' />
                        <GridColumn field='applicant' title='申請人' />
                        <GridColumn field='date' title='申請日期' />
                        <GridColumn field='status' title='狀態' />
                    </Grid>
                </CardBody>
            </Card>
        </div>
    );
}

export default Home;
