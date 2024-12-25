export function usePager(
  getList: Function,
  initPageNum: number = 1,
  initPageSize: number = 10,
  initTotal: number = 0
) {
  const pageNum = ref(initPageNum);
  const pageSize = ref(initPageSize);
  const total = ref(initTotal);

  onMounted(() => {
    getList();
  });

  watch(pageNum, (value) => {
    getList(value);
  });

  return { pageNum, pageSize, total };
}
